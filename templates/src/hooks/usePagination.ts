import  { useState, useMemo}  from 'react';

export const defaultPagination = {
  pageSize: 10,
  current: 1
};

export type defaultPaginationProps = Partial<typeof defaultPagination>

export interface PaginationProps extends  defaultPaginationProps {
  total?: number
  onChange?: (current: number, pageSize: number) => void
}

export function usePagination(config:PaginationProps = defaultPagination) {
  const [pagination, setPagination] = useState({
    pageSize: config.pageSize,
    current: config.current
  });

  const handelerPagination = (current: number, pageSize: number) => {
    if (config.onChange) {
      config.onChange(current, pageSize);
    }
    setPagination({ current, pageSize });
  }

  const paginationConfig = useMemo(() => {
    return {
      total: config.total,
      showSizeChanger: true,
      showQuickJumper: false,
      size: 'default',
      position: ['bottomCenter'],
      ...pagination,
      showTotal: (total:number) => `第 ${pagination.current}页 共 ${total}`,
      onChange: (current: number, pageSize: number) => {
        handelerPagination(current, pageSize)
      },
      onShowSizeChange: (current: number, pageSize: number) => {
        handelerPagination(current, pageSize)
      }
    };
  }, [config, pagination]);

  return paginationConfig;
}

// const { data = {}, loading, doFetch } = useFetch(getJokes, {
//   page: 1
// });
// const pagination = usePagination({
//   total: data.totalCount,
//   onChange: (page, limit) => {
//     doFetch({ page, limit });
//   }
// });
// const { rowSelection, selectedList, selectedRowKey, resetSelection } = useRowSelection();
// const columns = [
//   { title: "笑话内容", dataIndex: "content" },
//   { title: "更新时间", dataIndex: "updateTime" }
// ];
// console.log("render");
// return (
//   <Table
//     rowKey="content"
//     loading={loading}
//     pagination={pagination}
//     rowSelection={rowSelection}
//     columns={columns}
//     dataSource={data.list}
//     />
// );