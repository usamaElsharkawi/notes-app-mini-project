import connectDB from "@/lib/db";
import Note from "@/lib/models/Note";


export async function GET(req) {
    await connectDB();
    const notes = await Note.find().sort({createdAt: -1});

    return Response.json({notes},{status:200})
}



export async function POST(req) {
  try {
    await connectDB();
    
    // A. Parse JSON body safely
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { title, content } = body;

    // B. Create the document in MongoDB
    const note = await Note.create({ title, content });
    return Response.json({ note }, { status: 201 });

  } catch (error) {
    // C. Check if it's a Mongoose validation error
    if (error.name === "ValidationError") {
      // Mongoose validation errors have a nested 'errors' object
      const messages = Object.values(error.errors).map((val) => val.message);
      return Response.json({ error: messages.join(", ") }, { status: 400 });
    }

    // D. Generic server error
    console.error("POST Note Error:", error);
    return Response.json({ error: "Server failed to save note" }, { status: 500 });
  }
}
