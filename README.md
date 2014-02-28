nmc.js
======
nmc.js adds syntactic sugar to node-namecoin: adding promises, providing sane defaults, converting multiple options into objects, building query strings, etc.

Most of the heavy lifting is done by [node-namecoin](https://github.com/joshbeal/node-namecoin/) and you should refer to it's documentation for all of the various commands.

## Usage notes
Connecting to Namecoind should "just work" on most Unix systems.  `nmc.js` first
checks for a passed config object, then it checks for a local `settings.json`
file and it finally falls back to __searching for the config file at
`~/.namecoin/namecoin.conf`.__

(Technically, it looks for the `process.env.HOME + /.namecoin/namecoin.conf`.)

### Manually specify namecoind settings

#### GUI
1. Make a copy of `settings-example.json` and rename it to `settings.json`
2. Fill in config information in `settings.json`

#### CLI One-liner

```js
echo '{
   "host": "localhost",
   "port": 8336,
   "user": "REPLACE ME",
   "pass": "REPLACE ME"
 }
' > settings.json
```
