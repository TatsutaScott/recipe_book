import volume_conversion_table from '@/assets/data/volume_conversions.json' with { type: 'json' };
import weight_conversion_table from '@/assets/data/weight_conversions.json' with { type: 'json' };
import ingreident_conversion_table from '@/assets/data/ingredient_conversions.json' with { type: 'json' };
import { limitDecimals } from './util';

export function volume_conversion(from, to, amt){
  const to_ml = volume_conversion_table[from];
  const from_ml = volume_conversion_table[to];

  if(to_ml && from_ml){
    return limitDecimals((to_ml  * amt) / from_ml, 2);
  }else{
    throw new Error("incorrect units");
  }
}

export function weight_conversion(from, to, amt){
  const to_g = weight_conversion_table[from];
  const from_g = weight_conversion_table[to];

  if(to_g && from_g){
    return limitDecimals((to_g  * amt) / from_g);
  }else{
    throw new Error("incorrect units");
  }
}

export function temperature_conversion(from, to, amt){
  if(to === 'c_deg' && from === 'f_deg'){
    return limitDecimals((amt * 1.8) + 32);
  }else if (to === 'f_deg' && from === 'c_deg'){
    return limitDecimals((amt - 32) * (5 / 9));
  }else{
    throw new Error("incorrect units");
  }
}
const CUP_IN_ML = volume_conversion_table["c"];

function toGrams(ingredient, unit, amount) {
  if (!ingredient?.grams) {
    throw new Error("Ingredient must include grams per cup.");
  }

  const isWeight = weight_conversion_table[unit] !== undefined;
  const isVolume = volume_conversion_table[unit] !== undefined;

  if (!isWeight && !isVolume) {
    throw new Error("Invalid unit.");
  }

  if (isWeight) {
    return amount * weight_conversion_table[unit];
  }

  const ml = amount * volume_conversion_table[unit];
  const cups = ml / CUP_IN_ML;

  return cups * ingredient.grams;
}

function fromGrams(ingredient, unit, grams) {
  if (!ingredient?.grams) {
    throw new Error("Ingredient must include grams per cup.");
  }

  const isWeight = weight_conversion_table[unit] !== undefined;
  const isVolume = volume_conversion_table[unit] !== undefined;

  if (!isWeight && !isVolume) {
    throw new Error("Invalid unit.");
  }

  if (isWeight) {
    return grams / weight_conversion_table[unit];
  }

  const cups = grams / ingredient.grams;
  const ml = cups * CUP_IN_ML;

  return ml / volume_conversion_table[unit];
}

export function ingredient_conversion(ingredient, fromUnit, toUnit, amount){
  const ingredient_data = ingreident_conversion_table[ingredient];
  const grams = toGrams(ingredient_data, fromUnit, amount);
  return limitDecimals(fromGrams(ingredient_data, toUnit, grams), 2);
}
