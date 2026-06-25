import { defineConfig } from "tinacms";
import siteContent from "../content/site/main.json";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

type TinaField = Record<string, unknown>;

function titleCase(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function isImageField(name: string, value: unknown) {
  if (typeof value !== "string") return false;
  const lowerName = name.toLowerCase();
  const lowerValue = value.toLowerCase();
  return (
    ["image", "src"].includes(lowerName) ||
    lowerName.endsWith("image") ||
    lowerName.endsWith("src")
  ) && /\.(png|jpe?g|webp|gif|svg)$/.test(lowerValue);
}

function inferField(name: string, value: unknown): TinaField {
  const label = titleCase(name);

  if (Array.isArray(value)) {
    const first = value[0];
    if (first && typeof first === "object" && !Array.isArray(first)) {
      return {
        type: "object",
        name,
        label,
        list: true,
        fields: inferFields(first as Record<string, unknown>),
      };
    }

    return {
      type: "string",
      name,
      label,
      list: true,
      ui: { component: "textarea" },
    };
  }

  if (value && typeof value === "object") {
    return {
      type: "object",
      name,
      label,
      fields: inferFields(value as Record<string, unknown>),
    };
  }

  if (typeof value === "boolean") {
    return { type: "boolean", name, label };
  }

  if (typeof value === "number") {
    return { type: "number", name, label };
  }

  if (isImageField(name, value)) {
    return { type: "image", name, label };
  }

  const stringValue = typeof value === "string" ? value : "";
  return {
    type: "string",
    name,
    label,
    ui: stringValue.length > 90 ? { component: "textarea" } : undefined,
  };
}

function inferFields(value: Record<string, unknown>): TinaField[] {
  return Object.entries(value).map(([name, fieldValue]) => inferField(name, fieldValue));
}

export default defineConfig({
  branch,

  // Get this from tina.io for hosted /admin editing on Vercel
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io for hosted /admin editing on Vercel
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Content",
        path: "content/site",
        format: "json",
        fields: inferFields(siteContent),
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
