export interface TechProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  status: string;
  specs?: string;
  description?: string;
  image: string;
  images?: string[];
  imageFit?: string;      // raw value from admin (e.g. "4-3", "4-3-crop", "contain", "cover")
  imageFitCss?: string;   // resolved CSS value: "object-contain" | "object-cover"
  timestamp?: string;
}

/**
 * Map admin imageFit values to Tailwind CSS object-fit classes.
 *
 * Admin saves:
 *   "16-9"      → fit/no-crop → object-contain
 *   "16-9-crop" → fill/crop   → object-cover
 *   "4-3"       → fit/no-crop → object-contain
 *   "4-3-crop"  → fill/crop   → object-cover
 *   "1-1"       → fit/no-crop → object-contain
 *   "1-1-crop"  → fill/crop   → object-cover
 *   "contain"   → object-contain
 *   "cover"     → object-cover
 *   anything else → object-contain (safe default)
 */
export const resolveImageFitCss = (imageFit?: string): string => {
  if (!imageFit) return "object-contain";
  const v = imageFit.toLowerCase().trim();
  if (v === "cover" || v.endsWith("-crop")) return "object-cover";
  return "object-contain";
};

const FIRESTORE_URL =
  "https://firestore.googleapis.com/v1/projects/royal-executive-empire-ree/databases/(default)/documents/tech_products";

const parseFirestoreValue = (val: any): any => {
  if (!val) return "";
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return val.integerValue;
  if ("doubleValue" in val) return val.doubleValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("timestampValue" in val) return val.timestampValue;
  if ("arrayValue" in val) {
    return (val.arrayValue.values || []).map(parseFirestoreValue);
  }
  return "";
};

export const fetchTechProducts = async (): Promise<TechProduct[]> => {
  try {
    const res = await fetch(FIRESTORE_URL, {
      cache: "no-store", // Always fetch freshest data immediately
    });
    if (!res.ok) {
      console.warn("Firestore HTTP error", res.status);
      return [];
    }
    const data = await res.json();
    const docs = data.documents || [];

    const products: TechProduct[] = docs.map((doc: any) => {
      const fields = doc.fields || {};
      const id = doc.name ? doc.name.split("/").pop() : "";

      const rawImages = parseFirestoreValue(fields.images);
      const imagesList = Array.isArray(rawImages) ? rawImages : [];
      const primaryImage = parseFirestoreValue(fields.image) || (imagesList[0] || "");

      return {
        id,
        name: parseFirestoreValue(fields.name) || "Untitled Product",
        category: parseFirestoreValue(fields.category) || "Hardware",
        price: parseFirestoreValue(fields.price) || "",
        originalPrice: parseFirestoreValue(fields.originalPrice) || "",
        status: (parseFirestoreValue(fields.status) || "IN STOCK").toUpperCase(),
        specs: parseFirestoreValue(fields.specs) || "",
        description: parseFirestoreValue(fields.description) || "",
        image: primaryImage,
        images: imagesList,
        imageFit: parseFirestoreValue(fields.imageFit) || "cover",
        imageFitCss: resolveImageFitCss(parseFirestoreValue(fields.imageFit)),
        timestamp: parseFirestoreValue(fields.timestamp) || "",
      };
    });

    // Sort newest first
    products.sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });

    return products;
  } catch (err) {
    console.error("Failed to fetch tech products from Firestore:", err);
    return [];
  }
};

