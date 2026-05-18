export type Format = 'env' | 'json' | 'toml' | 'azure';

export function convert(input: string, from: Format, to: Format): string {
  if (!input.trim()) return '';
  
  let parsed: Record<string, string> = {};
  
  // 1. Parse Input
  try {
    if (from === 'env') {
      parsed = parseEnv(input);
    } else if (from === 'json') {
      parsed = JSON.parse(input);
    } else if (from === 'toml') {
      // Basic TOML parser for simple key=value pairs
      parsed = parseToml(input);
    } else if (from === 'azure') {
      parsed = parseAzure(input);
    }
  } catch (err) {
    throw new Error(`Failed to parse ${from.toUpperCase()} format`);
  }

  // 2. Format Output
  try {
    if (to === 'env') {
      return stringifyEnv(parsed);
    } else if (to === 'json') {
      return JSON.stringify(parsed, null, 2);
    } else if (to === 'toml') {
      return stringifyToml(parsed);
    } else if (to === 'azure') {
      return stringifyAzure(parsed);
    }
  } catch (err) {
    throw new Error(`Failed to convert to ${to.toUpperCase()} format`);
  }
  
  return '';
}

function parseEnv(str: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = str.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let key = match[1].trim();
      let val = match[2].trim();
      
      // Remove quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      result[key] = val;
    }
  }
  return result;
}

function stringifyEnv(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => {
      // If value contains spaces, quote it
      const val = v.includes(' ') || v.includes('\n') ? `"${v}"` : v;
      return `${k}=${val}`;
    })
    .join('\n');
}

function parseToml(str: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = str.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#') || line.startsWith('[')) continue;
    
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      result[key] = val;
    }
  }
  return result;
}

function stringifyToml(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => {
      return `${k} = "${v}"`;
    })
    .join('\n');
}

function parseAzure(str: string): Record<string, string> {
  const arr = JSON.parse(str);
  if (!Array.isArray(arr)) throw new Error('Azure format must be a JSON array');
  const result: Record<string, string> = {};
  arr.forEach(item => {
    if (item.name && item.value !== undefined) {
      result[item.name] = item.value;
    }
  });
  return result;
}

function stringifyAzure(obj: Record<string, string>): string {
  const arr = Object.entries(obj).map(([name, value]) => ({
    name,
    value,
    slotSetting: false
  }));
  return JSON.stringify(arr, null, 2);
}
