/**
 * Asset pointer helpers.
 *
 * Lovable Assets generates `.asset.json` files that contain rich metadata
 * (asset_id, project_id, url, r2_key, size, content_type, ...).
 *
 * Components should NEVER receive the whole object as a prop — passing the
 * full pointer leaks internal identifiers into the DOM/JSX and makes the
 * runtime type of `src` (or similar) ambiguous. Always resolve to a string
 * URL first using `resolveAssetUrl()`.
 */

export type AssetPointer = {
  url?: string | null;
  r2_key?: string | null;
  [key: string]: unknown;
};

const CDN_PREFIX = "/__l5e/assets-v1/";

/**
 * Returns a usable URL string for an asset pointer.
 * Prefers `url` (already a path), falls back to `r2_key` (mapped onto the
 * Lovable CDN prefix). Throws when neither is present so misuse fails loudly
 * instead of rendering a broken image.
 */
export function resolveAssetUrl(asset: AssetPointer): string {
  if (asset && typeof asset.url === "string" && asset.url.length > 0) {
    return asset.url;
  }

  if (asset && typeof asset.r2_key === "string" && asset.r2_key.length > 0) {
    // r2_key is stored as `a/v1/{project_id}/{asset_id}/{filename}`.
    // Strip the storage prefix and remap onto the public CDN path.
    const trimmed = asset.r2_key.replace(/^a\/v1\//, "");
    return `${CDN_PREFIX}${trimmed}`;
  }

  throw new Error(
    "resolveAssetUrl: asset pointer is missing both `url` and `r2_key`.",
  );
}
