import { decodeXML } from 'entities'
import { XMLParser, X2jOptions } from 'fast-xml-parser'
import { lowercaseFirstLetter, stripPrefix } from './normalize.js'

export type EmptyTag = string | null | undefined
export type XmlOptions = Partial<X2jOptions>

export interface ParseOptions {
  /**
   * When parsing XML the empty tags are replaced by '' - this is the default
   * behavior of fast-ml-parser. When this variable is set to any other value,
   * the empty tags are futher replaced by that value, overriding default ''.
   */
  emptyTag?: EmptyTag

  /**
   * Additional parse options for XML parser. Any option of fast-xml-parser
   * can be used here. This object is passed to the constructor of
   * fast-xml-parser. Then parser is used to parse XML response from GUS.
   *
   * See {@link https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/2.XMLparseOptions.md | fast-xml-parser}
   */
  xmlOptions?: XmlOptions
}

export const defaultParseOptions: ParseOptions = {
  emptyTag: '',
  xmlOptions: {
    // to avoid parsing string to number
    parseTagValue: false,
  },
}

export const legacyParseOptions: ParseOptions = {
  emptyTag: undefined,
  xmlOptions: {
    ...defaultParseOptions.xmlOptions,
    transformTagName: (name: string) =>
      lowercaseFirstLetter(stripPrefix(name, 'praw_')),
  },
}

/**
 * Within object `obj` replace empty string attributes values with `replacer`.
 * Modifies the object in place.
 */
export function replaceEmpty(obj: Record<string, any>, replacer: any) {
  for (let [key, val] of Object.entries(obj)) {
    if (typeof val === 'object') {
      replaceEmpty(val, replacer)
    } else if (val === '') {
      obj[key] = replacer
    }
  }
}

export class Xml {
  private emptyTag?: EmptyTag
  private xmlOptions: XmlOptions
  private _parser?: XMLParser

  constructor(options: Partial<ParseOptions> = {}) {
    // emptyTag could be null or undefined, then we need check if
    // that property exists in options object
    if (options && Object.hasOwn(options, 'emptyTag')) {
      this.emptyTag = options.emptyTag
    } else {
      this.emptyTag = defaultParseOptions.emptyTag
    }
    this.xmlOptions =
      options.xmlOptions || (defaultParseOptions.xmlOptions as XmlOptions)
  }

  parse(xml: string) {
    if (!this._parser) {
      this._parser = new XMLParser(this.xmlOptions)
    }
    const result = this._parser.parse(decodeXML(xml))

    if (this.emptyTag !== '') {
      replaceEmpty(result, this.emptyTag)
    }

    return result
  }
}