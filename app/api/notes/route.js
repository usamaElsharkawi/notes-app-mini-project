import connectDB from "@/lib/db";
import Note from "@/lib/models/Note";


export async function GET(req) {
    await connectDB();
    const notes = await Note.find().sort({createdAt: -1});

    return Response.json({notes},{status:200})
}


export async function POST(req) {
    await connectDB();

    const {title,content} =await req.json();
    
    const note = await Note.create({title,content});

    return Response.json({note},{status:201})

}