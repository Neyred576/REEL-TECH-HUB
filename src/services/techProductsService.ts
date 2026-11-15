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
  imageFit?: string;
  timestamp?: string;
}

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

