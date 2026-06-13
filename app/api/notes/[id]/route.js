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
    await connectDB();

    try {
        const { id } = await params;
        const { title, content } = await req.json();

        const note = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true,returnDocument:'after' }
        );
        //explain the option object above
        if (!note) {
            return Response.json("Note not found", { status: 404 });
        }

        return Response.json({ note }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json("Failed to update note", { status: 500 });
    }
}