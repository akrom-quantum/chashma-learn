const VOWELS = [
  { symbol: "iː",  example: "s**ee**d"  },
  { symbol: "ɪ",   example: "s**i**t"   },
  { symbol: "e",   example: "s**e**t"   },
  { symbol: "æ",   example: "s**a**t"   },
  { symbol: "ɑː",  example: "f**a**ther"},
  { symbol: "ɒ",   example: "g**o**t"   },
  { symbol: "ɔː",  example: "th**ou**ght"},
  { symbol: "ʊ",   example: "f**oo**t"  },
  { symbol: "uː",  example: "f**oo**d"  },
  { symbol: "ʌ",   example: "c**u**p"   },
  { symbol: "ɜː",  example: "b**ir**d"  },
  { symbol: "ə",   example: "**a**bout" },
  { symbol: "eɪ",  example: "f**a**ce"  },
  { symbol: "aɪ",  example: "pr**i**ce" },
  { symbol: "ɔɪ",  example: "ch**oi**ce"},
  { symbol: "aʊ",  example: "m**ou**th" },
  { symbol: "əʊ",  example: "g**o**at"  },
  { symbol: "ɪə",  example: "n**ear**"  },
  { symbol: "eə",  example: "squ**are**"},
  { symbol: "ʊə",  example: "c**ure**"  },
];

const CONSONANTS = [
  { symbol: "p",  example: "**p**en"   },
  { symbol: "b",  example: "**b**ad"   },
  { symbol: "t",  example: "**t**wo"   },
  { symbol: "d",  example: "**d**id"   },
  { symbol: "k",  example: "**c**at"   },
  { symbol: "ɡ",  example: "**g**et"   },
  { symbol: "tʃ", example: "**ch**ain" },
  { symbol: "dʒ", example: "**j**am"   },
  { symbol: "f",  example: "**f**all"  },
  { symbol: "v",  example: "**v**an"   },
  { symbol: "θ",  example: "**th**in"  },
  { symbol: "ð",  example: "**th**is"  },
  { symbol: "s",  example: "**s**oon"  },
  { symbol: "z",  example: "**z**ero"  },
  { symbol: "ʃ",  example: "**sh**ip"  },
  { symbol: "ʒ",  example: "plea**s**ure"},
  { symbol: "h",  example: "**h**ot"   },
  { symbol: "m",  example: "**m**ore"  },
  { symbol: "n",  example: "**n**ow"   },
  { symbol: "ŋ",  example: "si**ng**"  },
  { symbol: "l",  example: "**l**eg"   },
  { symbol: "r",  example: "**r**ed"   },
  { symbol: "j",  example: "**y**et"   },
  { symbol: "w",  example: "**w**et"   },
];

function SymbolGrid({ title, symbols }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: 0.5, color: "#9ca3af", margin: "0 0 10px" }}>
        {title}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 6 }}>
        {symbols.map(({ symbol, example }) => (
          <div key={symbol} style={{
            background: "#f9fafb", border: "1px solid #e5e7eb",
            borderRadius: 6, padding: "6px 8px", textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontFamily: "monospace", color: "#1e40af", marginBottom: 2 }}>
              /{symbol}/
            </div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IPAQuickReference() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 10, padding: "20px 22px", marginBottom: 28,
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: "#111827" }}>
        IPA Quick Reference
      </h2>
      <SymbolGrid title="Vowels and diphthongs" symbols={VOWELS} />
      <SymbolGrid title="Consonants" symbols={CONSONANTS} />
    </div>
  );
}
