<template>
  <Layout :hideHeader="true" :disableScroll="true">
    <div class="container sm:pxi-0 mx-auto overflow-x-hidden pt-24">
      <div class="lg:mx-32 md:mx-16 sm:mx-8 mx-4 pt-8">
        <section class="post-header container mx-auto px-0 mb-4 border-b">
          <span class="text-blue-500 font-medium uppercase tracking-wide text-sm">
            <g-link
              :to="$page.blog.category.path"
              class="hover:underline"
            >{{ $page.blog.category.title }}</g-link>
          </span>
          <h1 class="text-5xl font-medium leading-none mt-0">{{ $page.blog.title}}</h1>
          <div class="text-2xl pt-4 pb-10 text-gray-700 font-serif" v-html="$page.blog.excerpt"></div>
        </section>
        <section class="post-author-list mb-10 mx-0">
          <div class="flex items-center">
            <div class="flex justify-between items-center">
              <ul class="list-none flex author-list">
                <li v-for="author in $page.blog.author" :key="author.id" class="author-list-item">
                  <g-link :to="author.path" v-tooltip="author.name">
                    <g-image
                      :src="author.image"
                      :alt="author.name"
                      class="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 border-2 border-white"
                    />
                  </g-link>
                </li>
              </ul>
            </div>
            <div class="pl-3 flex flex-col text-xs leading-none uppercase">
              <p>
                <span v-for="(author, index) in $page.blog.author" :key="author.id">
                  <g-link
                    :to="author.path"
                    v-tooltip="author.name"
                    class="hover:underline"
                  >{{ author.name }}</g-link>
                  <span v-if="index < $page.blog.author.length-1">,</span>
                </span>
              </p>
              <p class="text-gray-700">
                <time :datetime="$page.blog.datetime">{{ $page.blog.humanTime }}</time>
                &nbsp;&middot;&nbsp; {{ $page.blog.timeToRead }} min read
              </p>
            </div>
          </div>
        </section>
      </div>
	  
      <section class="post-image mx-auto w-full">
        <div class="embed-container" v-if="$page.blog.video">
        <iframe
          width="1000"
          height="563"
          :src="$page.blog.video"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          v-if="$page.blog.video"
        ></iframe>
        </div>
		<g-image
        v-if="!$page.blog.video && $page.blog.cover"
        :src="$page.blog.cover"
        class="cover"
        />
      </section>

      <div class="lg:mx-32 md:mx-16 px-4 sm:px-0">
        <section class="post-content container mx-auto relative font-serif text-gray-700">
          <div class="post-content-text text-xl" v-html="$page.blog.content"></div>
        </section>

        <section class="post-tags container mx-auto relative py-10">
          <g-link
            v-for="tag in $page.blog.tags"
            :key="tag.id"
            :to="tag.path"
            class="text-xs bg-transparent hover:text-blue-700 py-2 px-4 mr-2 border hover:border-blue-500 border-gray-600 text-gray-700 rounded-full"
          >{{ tag.title }}</g-link>
        </section>
      </div>
    </div>

    <section class="post-related bg-black text-gray-200 pt-10 border-b border-b-gray-900">
      <div class="container mx-auto">
        <div class="flex flex-wrap pt-8 pb-8 mx-4 sm:-mx-4">
          <PostListItem v-if="$page.previous" :record="$page.previous" :border=false></PostListItem>
          <PostListItem v-if="$page.next" :record="$page.next" :border=false></PostListItem>
        </div>
      </div>
    </section>
  </Layout>
</template>

<style>
.cover {
  margin-top: 10px;
}
.g-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<page-query>
  query($id: ID!, $previousElement: ID!, $nextElement: ID!) {
    blog(id: $id) {
      title
      path
      image(width:1600, height:800)
      image_caption
      excerpt
      content
      humanTime : created(format:"DD MMMM YYYY")
      datetime : created(format:"ddd MMM DD YYYY hh:mm:ss zZ")
      timeToRead
	  cover
	  video
      tags {
        id
        title
        path
      }
      category {
        id
        title
        path
        belongsTo(limit:4) {
          totalCount
          edges {
            node {
              ... on Blog {
                title
                path
              }
            }
          }
        }
      }
      author {
        id
        name
        image
        path
      }
      tags {
        id
        title
        path
      }
    }

    previous: blog(id: $previousElement) {
      title
      excerpt
      image(width:800)
      path
      timeToRead
      category {
        id
        title
      }
      author {
        id
        name
        image(width:64, height:64, fit:inside)
        path
      }
    }

    next: blog(id: $nextElement) {
      title
      excerpt
      image(width:800)
      path
      timeToRead
      category {
        id
        title
      }
      author {
        id
        name
        image(width:64, height:64, fit:inside)
        path
      }
    }


    
  }
</page-query>

<script>
import PostListItem from "~/components/PostListItem.vue";

export default {
  components: {
    PostListItem
  },
  metaInfo() {
    return {
      title: this.$page.blog.title
    };
  }
  
};
</script>