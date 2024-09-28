import { R as Randomizer, F as Faker, L as LocaleDefinition } from './vi-BAkV-Keg.js';
export { j as Casing, C as ColorDefinition, k as ColorFormat, l as ColorModule, h as CssFunction, m as CssFunctionType, i as CssSpace, n as CssSpaceType, o as DatatypeModule, D as DateDefinition, a as DateEntryDefinition, p as DateModule, g as FakerOptions, H as HelpersModule, s as ImageModule, I as InternetDefinition, t as InternetModule, b as LocaleEntry, c as LocationDefinition, u as LocationModule, d as LoremDefinition, v as LoremModule, M as MetadataDefinition, N as NumberColorFormat, w as NumberModule, P as PersonDefinition, e as PersonEntryDefinition, y as PersonModule, A as PhoneModule, f as PhoneNumberDefinition, x as Sex, z as SexType, q as SimpleDateModule, G as SimpleFaker, r as SimpleHelpersModule, S as StringColorFormat, B as StringModule, W as WordDefinition, E as WordModule, K as fakerVI, J as simpleFaker } from './vi-BAkV-Keg.js';

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
