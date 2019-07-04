# vue-better-time-display

A time-display components. Make times look more readable and user-friendly.

## usage

```js
import Vue from 'vue'
import BetterTime from './vue-better-time-display'

Vue.use(BetterTime)
```


```html
<template>
    // x days ago
    <better-time :time="time" />
</template>

<script>
export default {
    data () {
        return {
            time: '2019-07-02 00:00:00'
        }
    }
}
</script>
```

## localized
you can localized the component into your language by modify config.js


## params
params | type | description | Default
---- | ---- | ---- | ----
time(required) | Number, String |the time you want to transformed |
tag | String | html tag | span
type | String | relative, datetime or date | relative
interval | Number | interval of data refresh | 60


