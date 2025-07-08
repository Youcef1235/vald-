import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Concert {
  id: string
  venue: string
  date: string
  description?: string
  location?: string
}

export const getConcerts = async (): Promise<Concert[]> => {
  const querySnapshot = await getDocs(collection(db, "concerts"))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Concert[]
}