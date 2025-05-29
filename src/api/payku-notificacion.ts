import type { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "@/api/sanityApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const data = req.body;

 // Agrega este log para ver los datos recibidos de Payku
  console.log("Datos recibidos de Payku:", data);

  // Aquí puedes mapear los datos de Payku a tu modelo de orden
  try {
    await createOrder({
      // Mapea los campos según lo que envía Payku y tu modelo de Sanity
      paymentId: data.transaction_id,
      status: data.status,
      amount: data.amount,
      customer: {
        nombre: data.customer_name,
        email: data.customer_email,
        telefono: data.customer_phone,
      },
      // ...otros campos relevantes
    });

    res.status(200).json({ message: "Notificación recibida y orden creada" });
  } catch (error) {
    console.error("Error creando orden:", error);
    res.status(500).json({ message: "Error procesando la notificación" });
  }
}