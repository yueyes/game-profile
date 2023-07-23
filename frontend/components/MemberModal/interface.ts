import { Dispatch, SetStateAction } from "react";

export interface IModalProps{
    setCurrentMode : Dispatch<SetStateAction<string>>;
}
