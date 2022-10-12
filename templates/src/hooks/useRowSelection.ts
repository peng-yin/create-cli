import { useState, useMemo, useCallback }  from 'react';

interface optionsProps {
  selectedList?: any[]
  selectedRowKey?: any[]
  onChange?: (value: any, k: any) => void
}
export function useRowSelection(options: optionsProps = {}) {
  const [selectedList, setSelectedList] = useState(options?.selectedList || []);
  const [selectedRowKey, setSelectedRowKeys] = useState(
    options.selectedRowKey || []
  );
  const rowSelection = useMemo(() => {
    return {
      columnWidth: "44px",
      ...options,
      selectedList,
      selectedRowKey,
      onChange: (selectedRowKeys:any, selectedRows:any) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedList(selectedRows);
        if (options?.onChange) {
          options.onChange(selectedRowKeys, selectedRows);
        }
      }
    };

  }, [selectedList, selectedRowKey, options]);

  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);

  return { rowSelection, selectedList, selectedRowKey, resetSelection };
}