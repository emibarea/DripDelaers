import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
  console.log("aca govir", URL);
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      // Manejar errores de respuesta HTTP aquí, si es necesario.
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Manejar errores de red, errores de análisis JSON, etc.
    console.error("Error en la solicitud de categorías:", error);
    throw error; // Opcionalmente, puedes lanzar el error nuevamente para que lo maneje el código que llama a esta función.
  }
};

export default getColors;
