import { R as Randomizer, F as Faker, L as LocaleDefinition } from './vi-01IsfIlr.js';
export { r as Aircraft, s as AircraftType, A as AirlineDefinition, t as AirlineModule, a as AnimalDefinition, u as AnimalModule, Z as BitcoinAddressFamily, $ as BitcoinAddressFamilyType, _ as BitcoinNetwork, a0 as BitcoinNetworkType, x as Casing, ag as ChemicalElement, C as ColorDefinition, y as ColorFormat, z as ColorModule, b as CommerceDefinition, J as CommerceModule, c as CommerceProductNameDefinition, d as CompanyDefinition, K as CompanyModule, v as CssFunction, B as CssFunctionType, w as CssSpace, E as CssSpaceType, X as Currency, D as DatabaseDefinition, O as DatabaseModule, Q as DatatypeModule, e as DateDefinition, f as DateEntryDefinition, T as DateModule, q as FakerOptions, g as FinanceDefinition, Y as FinanceModule, h as FoodDefinition, a1 as FoodModule, a2 as GitModule, H as HackerDefinition, a3 as HackerModule, a4 as HelpersModule, a6 as ImageModule, I as InternetDefinition, a7 as InternetModule, i as LocaleEntry, j as LocationDefinition, a8 as LocationModule, k as LoremDefinition, a9 as LoremModule, M as MetadataDefinition, l as MusicDefinition, aa as MusicModule, N as NumberColorFormat, ab as NumberModule, P as PersonDefinition, m as PersonEntryDefinition, ad as PersonModule, af as PhoneModule, n as PhoneNumberDefinition, S as ScienceDefinition, ah as ScienceModule, ac as Sex, ae as SexType, U as SimpleDateModule, an as SimpleFaker, a5 as SimpleHelpersModule, G as StringColorFormat, aj as StringModule, o as SystemDefinition, p as SystemMimeTypeEntryDefinition, ak as SystemModule, ai as Unit, V as VehicleDefinition, al as VehicleModule, W as WordDefinition, am as WordModule, ap as fakerVI, ao as simpleFaker } from './vi-01IsfIlr.js';

/**
 * An error instance that will be thrown by faker.
 */
declare class FakerError extends Error {
}

/**
 * Generates a MersenneTwister19937 randomizer with 32 bits of precision.
 * This is the default randomizer used by faker prior to v9.0.
 */
declare function generateMersenne32Randomizer(): Randomizer;
/**
 * Generates a MersenneTwister19937 randomizer with 53 bits of precision.
 * This is the default randomizer used by faker starting with v9.0.
 */
declare function generateMersenne53Randomizer(): Randomizer;

declare const faker$1: Faker;

declare const faker: Faker;

declare const allFakers: {
    readonly base: Faker;
    readonly en: Faker;
    readonly vi: Faker;
};

declare const base: LocaleDefinition;

declare const en: LocaleDefinition;

declare const vi: LocaleDefinition;

declare const allLocales: {
    base: LocaleDefinition;
    en: LocaleDefinition;
    vi: LocaleDefinition;
};

/**
 * Merges the given locales into one locale.
 * The locales are merged in the order they are given.
 * The first locale that provides an entry for a category will be used for that.
 * Mutating the category entries in the returned locale will also mutate the entries in the respective source locale.
 *
 * @param locales The locales to merge.
 *
 * @returns The newly merged locale.
 *
 * @example
 * import { de_CH, de, en, mergeLocales } from '@faker-js/faker';
 *
 * const de_CH_with_fallbacks = mergeLocales([ de_CH, de, en ]);
 *
 * @since 8.0.0
 */
declare function mergeLocales(locales: LocaleDefinition[]): LocaleDefinition;

export { Faker, FakerError, LocaleDefinition, Randomizer, allFakers, allLocales, base, en, faker, faker$1 as fakerBASE, faker as fakerEN, generateMersenne32Randomizer, generateMersenne53Randomizer, mergeLocales, vi };
