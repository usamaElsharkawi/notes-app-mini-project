import connectDB from "@/lib/db";
import Note from "@/lib/models/Note";

export async function DELETE(req,{params}) {
    await connectDB();

    try {
        //is this params is a promise,why?
        const {id} = await params;
        //what does the findByIdAndDelete return?
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return Response.json("Note not found",{status:404});
        }
        return Response.json({note},{status:200});

    } catch (error) {
        console.log(error);
        return Response.json("Failed to delete note",{status:500});
    }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const { title, content } = await req.json();

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json({ note }, { status: 200 });
  } catch (error) {
    // Catch Mongoose invalid ObjectId formatting
    if (error.name === "CastError") {
      return Response.json({ error: "Invalid Note ID format" }, { status: 400 });
    }

    // Catch schema validation during update (e.g. if title is set to empty)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return Response.json({ error: messages.join(", ") }, { status: 400 });
    }

    console.error("PUT Note Error:", error);
    return Response.json({ error: "Failed to update note" }, { status: 500 });
  }
}
