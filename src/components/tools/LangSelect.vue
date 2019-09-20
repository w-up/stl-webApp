<template>
  <a-dropdown>
    <span
      class="action global-lang"
      style="min-width: 100px;display:inline-block;text-align:center;"
    >
      <!-- <a-icon type="global" style="font-size: 16px"/> -->
      {{ lang }}
    </span>
    <a-menu slot="overlay" style="width: 150px;" @click="SwitchLang">
      <a-menu-item key="zh-CN">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
        </a>
      </a-menu-item>
      <a-menu-item key="zh-TW">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="繁体中文">🇭🇰</span> 繁体中文
        </a>
      </a-menu-item>
      <a-menu-item key="en-US">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="English">🇬🇧</span> English
        </a>
      </a-menu-item>
      <a-menu-item key="pt-BR">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="Português">🇧🇷</span> Português
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mixin as langMixin } from '@/store/i18n-mixin'

export default {
  name: 'LangSelect',
  mixins: [langMixin],
  data () {
    return {
      lang: '简体中文'
    }
  },
  methods: {
    SwitchLang (row) {
      this.setLang(row.key)
      switch (row.key) {
        case 'zh-CN':
          this.lang = '简体中文'
          break
        case 'zh-TW':
          this.lang = '繁体中文'
          break
        case 'en-US':
          this.lang = 'English'
          break
        case 'pt-BR':
          this.lang = 'Português'
          break

        default:
          this.lang = '简体中文'
          break
      }
    }
  }
}
</script>
