<template>
  <div v-if="editor" style="display:flex;justify-content:space-around;align-items:center;width:100%;margin:1rem 0;">
    <RemixIcon class="iconElement" icon="bold" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" />
    <RemixIcon class="iconElement" icon="italic" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" />
    <RemixIcon class="iconElement" icon="strikethrough" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" />
    <RemixIcon class="iconElement" icon="code-line" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }" />
    <RemixIcon class="iconElement" icon="format-clear" @click="editor.chain().focus().unsetAllMarks().run()" :class="{ 'is-active': editor.isActive('code') }" />

    <div class="divider"></div>

    <RemixIcon class="iconElement" icon="text" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" />
    <RemixIcon class="iconElement" icon="h-1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" />
    <RemixIcon class="iconElement" icon="h-2" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" />
    <RemixIcon class="iconElement" icon="h-3" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" />
    <RemixIcon class="iconElement" icon="h-4" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" />
    <RemixIcon class="iconElement" icon="h-5" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" />
    <RemixIcon class="iconElement" icon="h-6" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" />
    
    <div class="divider"></div>

    <RemixIcon class="iconElement" icon="list-unordered" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList')}" />
    <RemixIcon class="iconElement" icon="list-ordered" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" />
    <RemixIcon class="iconElement" icon="code-box-line" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" />
    <RemixIcon class="iconElement" icon="double-quotes-l" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" />
    <RemixIcon class="iconElement" icon="separator" @click="editor.chain().focus().setHorizontalRule().run()" />
    <RemixIcon class="iconElement" icon="text-wrap" @click="editor.chain().focus().setHardBreak().run()" />

    <div class="divider"></div>

    <RemixIcon class="iconElement" icon="arrow-go-back-line" @click="editor.chain().focus().undo().run()" />
    <RemixIcon class="iconElement" icon="arrow-go-forward-line" @click="editor.chain().focus().redo().run()" />
    
    </div>
  <editor-content class="editor-box" :editor="editor" />
</template>

<style lang="scss" scoped>

  .iconElement{
    height: 20px!important;
    width: 20px!important;
    background: white!important;
    border-radius: 10%;
    transition: all 0.3s;
  }

  .iconElement:hover{
    transform: scale(1.2);
    filter: invert(1);
  }
  
  .divider{
    width: 2px;
    height: 1.25em;
    background-color: rgba(13,13,13,.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
  }

  .editor-box{
    min-height: 60vh!important;
  }

  .editor-box > * {
    background-color: red!important;;
  }



</style>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { defaultExtensions } from '@tiptap/starter-kit'
import RemixIcon from '@/components/RemixIcon.vue';
export default {
  name:"Tiptap",
  components: {
    EditorContent,
    RemixIcon
  },

  emits:["update"],

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.modelValue, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: '',
      extensions: [...defaultExtensions()],
      editable: true,
      onUpdate: () => {
        // console.log(this.editor.getHTML())
        this.$emit('update', this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>