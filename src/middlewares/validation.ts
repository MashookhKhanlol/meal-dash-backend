import { NextFunction, Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

const handleValidationErrors = async(req: Request , res : Response , next : NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors : errors.array()})
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine").isString().notEmpty().withMessage("AddressLine must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    body("country").isString().notEmpty().withMessage("country must be a string")
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country Name is required"),
    body("deliveryPrice").isFloat({min : 0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min : 0}).withMessage("Estimated Delivery time must be an integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Items name is required"),
    body("menuItems.*.name").isFloat({ min : 0}).withMessage("Menu Items Price is required"),
    handleValidationErrors
    
]