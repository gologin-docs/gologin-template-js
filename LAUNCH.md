```javascript
  const token = "t67asdf786678sf678asdf678asdf6789asdf6789"
  const gologin = Gologin(token);
```


```javascript
  const browser = await gologin.launch({
    "target": "local",
    headless: false
  });
```

```javascript
  const browser = await gologin.launch({
    "target": "cloud",
    headless: false
  });
```


```javascript
  const browser = await gologin.launch({
    cloud: true,
    headless: false
  });
```


```javascript
  const browser = await gologin.launch({
    cloud: true,
    headless: true
  });
```
