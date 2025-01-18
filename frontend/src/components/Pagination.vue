<template>
  <div class="d-flex justify-content-center" v-if="totalPages > 1">
    <nav>
      <ul class="pagination">
        <li :class="['page-item', { disabled: currentPage === 1 }]">
          <a class="page-link" @click.prevent="changePage(currentPage - 1)">
            &laquo;
          </a>
        </li>

        <li
          v-for="page in pagesToShow"
          :key="page"
          :class="['page-item', { active: page === currentPage }]"
        >
          <a
            v-if="typeof page === 'number'"
            class="page-link"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </a>
          <span v-else class="page-link">...</span>
        </li>

        <li :class="['page-item', { disabled: currentPage === totalPages }]">
          <a class="page-link" @click.prevent="changePage(currentPage + 1)">
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:currentPage"],
  setup(props, { emit }) {
    const pagesToShow = computed(() => {
      const range: (number | string)[] = [];
      const total = props.totalPages;
      const current = props.currentPage;

      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);

      if (start > 1) range.push(1, "...");
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      if (end < total) range.push("...", total);

      return range;
    });

    const changePage = (page: number) => {
      if (page > 0 && page <= props.totalPages) {
        localStorage.setItem("current_page", String(page));
        emit("update:currentPage", page);
      }
    };
    return {
      pagesToShow,
      changePage,
    };
  },
});
</script>
