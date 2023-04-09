import { IItem } from "../App";
import { ADD, DEL, EDIT } from "./actionTypes";

export const addItem = (item: IItem) => ({
    type: ADD,
    data: item
})

export const editItem = (item: IItem) => ({
    type: EDIT,
    data: item
})

export const delItem = (id: number) => ({
    type: DEL,
    data: id,
})