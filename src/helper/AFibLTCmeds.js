import { AFibColumns } from "@/enums/AFibColumns";

export function getAnticoagulantType(dataRow) {
AFibColumns
    let OnAnticoag = "No";

    let DOAC, Warf, AnticoagContra, AnticoagDecline;

    DOAC = dataRow[AFibColumns.DOAC_Date];
    Warf = dataRow[AFibColumns.WarfarinDate];
    AnticoagContra = dataRow[AFibColumns.AnticoagContraDate];
    AnticoagDecline = dataRow[AFibColumns.AnticoagDeclineDate];
    
    if (DOAC) {        
        OnAnticoag = "YES - DOAC";
        if (Warf && Date.parse(Warf) > Date.parse(DOAC))
            OnAnticoag = "YES - Warf"
    }
    else if (Warf) {
        OnAnticoag = "YES - Warf";
    }
    else if (AnticoagContra) 
        OnAnticoag = "CONTRA"

    else if (AnticoagDecline)
        OnAnticoag = "DECLINED"
    
    return OnAnticoag;
}

export function getAspirinAntiplatelet(dataRow) {

    let OnAsprineAntip = "No";

    OnAsprineAntip = dataRow[AFibColumns.AspirinDate] || dataRow[AFibColumns.AntiplateletDate] ? "YES" : "NO";
    
    return OnAsprineAntip;
}