import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLang, supportLangs } from "./i18nConfig";
import en from "./en.json"
import vi from "./vi.json"
import { RootState } from "../redux/store";

interface Translations {
    [key: string]: string
}

const translations: Record<string, Translations> = {
    vi: vi,
    en: en
}

interface i18nState {
    lang: string,
    supportLangs: Translations
    translation: Record<string, Translations>
}

const initialState: i18nState = {
    lang: defaultLang,
    supportLangs: supportLangs,
    translation: translations
}

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<string>) => {
            state.lang = action.payload
        }
    }
})

export const { setLang } = i18nSlice.actions

export const selectTranslation = (state: RootState) => state.i18n.translation[state.i18n.lang]

export default i18nSlice.reducer