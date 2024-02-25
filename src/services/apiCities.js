import supabase from "./supabase"

export async function createCity(newCity) {
  const { data, error } = await supabase.from("cities").insert([newCity]).select().single()

  if (error) {
    console.log(error)
    throw new Error("City could not be created")
  }

  return data
}

export async function getCities() {
  const { data, error } = await supabase.from("cities").select("*")

  if (error) {
    console.log(error)
    throw new Error("Error fetching cities")
  }

  return data
}

export async function deleteCity(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("cities").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("City could not be deleted")
  }
  return data
}

export async function updateCity(city, id) {
  const { data, error } = await supabase.from("cities").update(city).eq("id", id).select().single()

  if (error) {
    console.log(error)
    throw new Error("City could not be updated")
  }

  return data
}

export async function getCity(id) {
  const { data, error } = await supabase.from("cities").select("*").eq("id", id).single()

  if (error) {
    console.log(error)
    throw new Error("Error fetching city")
  }

  return data
}
