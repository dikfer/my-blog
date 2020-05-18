<template>
  <Layout>
    <div class="container sm:pxi-0 mx-auto overflow-x-hidden">
      <div class="flex flex-wrap with-large pt-16 pb-16 mx-4 sm:-mx-4">
        <PostListItem v-for="edge in $page.entries.edges" :key="edge.node.id" :record="edge.node" />
	  </div>
		
	<div class="parent">
	<div class="myLogo">
	<font-awesome :icon="['fas', 'video']" class="mr-3"></font-awesome>
	</div>
	<div class="child">
	<a href="/author/andrej-rublev/" class="">
	<p class="uppercase font-medium text-xs text-blue-700 mt-3">Посмотреть все посты автора >>></p></a>
	</div>
     </div>
    	 
    </div>   
  </Layout>
</template>

<style>	
.myLogo {
          display: inline;
          float: left;
          margin-left: 10px;
          margin-top: 30px;
        }

        .child {
          white-space: nowrap;
          display: inline;
          float: right;
          margin-top: 20px;
          margin-right: 30px;
          font-size: large;
        }

        .parent {
          display: inline-block;
          clear:both;
    }
</style>	

<page-query>

query($page:Int) {

  entries: allBlog(perPage: 9, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
	    id
        title
        excerpt
        image(width:800)
        path
        timeToRead
        humanTime : created(format:"DD MMM YYYY")
        datetime : created
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
  }
}

</page-query>

<script>

import PostListItem from '~/components/PostListItem.vue';

export default {
  metaInfo: {
    title: "News!"
  },
  components: {
    PostListItem
  }
};
</script>
