// GET api/user/[userID]/hackathons
// Returns a list of all the hackathon names a user is or was involved in

import { NextResponse } from "next/server";
import { auth } from '@/auth';
import { getValue } from "@/services/fetchData";

export async function GET(request: Request){
    const session = await auth();
    try {
        const response = (await getValue(session!.user.email!))["hackathons"]
        return NextResponse.json({ message: response }, { status: 200 })

    } catch {
        return NextResponse.json({ error: "Something went catastrophically wrong." }, { status: 400 })
    }

}