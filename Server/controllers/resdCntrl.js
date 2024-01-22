import asyncHandler from 'express-async-handler'

import { prisma } from "../config/prismaConfig.js"

export const createResidency = asyncHandler(async (req, res) => {
    const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data

    console.log(req.body.data)
    try {
        const residency = await prisma.residency.create({
            data: {
                title, description, price, address, country, city, facilities, image, owner: { connect: { email: userEmail } }
            }
        });
        res.send({ message: "Residency created successfully" })
    }
    catch (error) {
        if (error.code === "P2002") {
            throw new Error("A residency with address already there")
        }
        throw new Error(err.message)
    }
});

//function to get all the residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(residencies)
});

//function to get a specific residency
export const getResidency = asyncHandler(async (req, res) => {
    const {id} =req.params;

    try{
        const residency =await prisma.residency.findUnique({
            where : { id : id }
        });
        res.send(residency);
    }catch(error){
        throw new Error(err.message);
    }
})