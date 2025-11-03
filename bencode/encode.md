| Input (JavaScript Data)          | Expected Output (Bencoded String) |
| :------------------------------: | :-------------------------------: |
| `123`                            | `"i123e"`                         |
| `-42`                            | `"i-42e"`                         |
| `0`                              | `"i0e"`                           |
| `"hello"`                        | `"5:hello"`                       |
| `""`                             | `"0:"`                            |
| `"hello world"`                  | `"11:hello world"`                |
| `"special!@#$chars"`             | `"14:special!@#$chars"`           |
| `["apple", 123, ["banana", -5]]` | `"l5:applei123el6:bananai-5eee"`  |
| `[]`                             | `"le"`                            |
| `[0, "", ["test"]]`              | `"li0e0:l4:testee"`               |
| `["", 0, []]`                    | `"l0:i0ele"`                      |
| `["one", ["two", ["three"]]]`    | `"l3:onel3:twol5:threeeee"`       |
