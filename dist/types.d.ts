/**
 * Options for method `GetValue`.
 */
export type GetValueOptions = 'StanDanych' | 'KomunikatKod' | 'KomunikatTresc' | 'StatusSesji' | 'StatusUslugi' | 'KomunikatUslugi';
/**
 * Map of values returned by GetValue('KomunikatKod')
 */
export declare const KomunikatKodErrorCodes: {
    '': string;
    '0': string;
    '1': string;
    '2': string;
    '4': string;
    '5': string;
    '7': string;
};
/**
 * Reports for method `DanePobierzPelnyRaport`.
 */
export type DanePobierzPelnyRaportOptions = 'PublDaneRaportFizycznaOsoba' | 'PublDaneRaportDzialalnoscFizycznejCeidg' | 'PublDaneRaportDzialalnoscFizycznejRolnicza' | 'PublDaneRaportDzialalnoscFizycznejPozostala' | 'PublDaneRaportDzialalnoscFizycznejWKrupgn' | 'PublDaneRaportDzialalnosciFizycznej' | 'PublDaneRaportLokalneFizycznej' | 'PublDaneRaportLokalnaFizycznej' | 'PublDaneRaportDzialalnosciLokalnejFizycznej' | 'PublDaneRaportPrawna' | 'PublDaneRaportDzialalnosciPrawnej' | 'PublDaneRaportLokalnePrawnej' | 'PublDaneRaportLokalnaPrawnej' | 'PublDaneRaportDzialalnosciLokalnejPrawnej' | 'PublDaneRaportWspolnicyPrawnej' | 'PublDaneRaportTypJednostki' | 'BIR11OsFizycznaDaneOgolne' | 'BIR11OsFizycznaDzialalnoscCeidg' | 'BIR11OsFizycznaDzialalnoscRolnicza' | 'BIR11OsFizycznaDzialalnoscPozostala' | 'BIR11OsFizycznaDzialalnoscSkreslonaDo20141108' | 'BIR11OsFizycznaPkd' | 'BIR11OsFizycznaListaJednLokalnych' | 'BIR11JednLokalnaOsFizycznej' | 'BIR11JednLokalnaOsFizycznejPkd' | 'BIR11OsPrawna' | 'BIR11OsPrawnaPkd' | 'BIR11OsPrawnaListaJednLokalnych' | 'BIR11JednLokalnaOsPrawnej' | 'BIR11JednLokalnaOsPrawnejPkd' | 'BIR11OsPrawnaSpCywilnaWspolnicy' | 'BIR11TypPodmiotu';
/**
 * Reports for method `DanePobierzRaportZbiorczy`.
 */
export type DanePobierzRaportZbiorczyOptions = 'BIR11NowePodmiotyPrawneOrazDzialalnosciOsFizycznych' | 'BIR11AktualizowanePodmiotyPrawneOrazDzialalnosciOsFizycznych' | 'BIR11SkreslonePodmiotyPrawneOrazDzialalnosciOsFizycznych' | 'BIR11NoweJednostkiLokalne' | 'BIR11AktualizowaneJednostkiLokalne' | 'BIR11SkresloneJednostkiLokalne';
