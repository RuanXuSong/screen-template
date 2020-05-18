/*
 * @文件描述:表格模块
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2019-11-01 15:03:19
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-16 17:50:27
 */

import React from 'react';
import styles from './index.module.less';
import classnames from 'classnames';
import AutoVerticalRoll from '@/components/AutoVerticalRoll';

// 常量0
const ZERO = 0;

export interface ColumnsProps {
  /** 唯一值，同antd中的dataIndex */
  dataIndex: string;
  /** 表头标题 */
  title?: string;
  /** 根据对应columns的key渲染数据 */
  key?: string;
  /** 同antd中的render() */
  render?(record: object): string | JSX.Element;
  /** 宽度百分比 */
  width?: number;
  align?: 'left' | 'center' | 'right';
}

interface CustomTableProps {
  /** 列数组 */
  columns: ColumnsProps[];
  /** 表格数据源 */
  dataSource: object[];
  /** 允许scroll */
  enabledScroll?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns = [],
  dataSource = [],
  enabledScroll = false,
}) => {
  /**
   * 每列计算出百分比宽度
   * @param columns
   */
  const getColumnsWithWidth = (columns: ColumnsProps[]) => {
    const filterColumns = columns
      .filter(item => !!item.width)
      .map(item => item.width);
    const count =
      filterColumns.length > 0
        ? filterColumns.reduce((pre, next) => pre! + next!)
        : 0;
    const restLength = columns.length - filterColumns.length;
    const residualMean = restLength > 0 ? (100 - count!) / restLength : 0;
    return columns.map(item => ({
      ...item,
      width: `${item.width || residualMean}%`,
    }));
  };

  const transColumns = getColumnsWithWidth(columns);

  /** 根据key值生成表格体内容  3000:list长度太大会造成性能问题，当前项目限制为3000  */
  const renderTbody = (list: object[]) =>
    list.slice(0, 3000).map((item, index) => (
      <div
        key={index}
        className={classnames(
          styles.bodyRow,
          index % 2 !== ZERO ? styles.lightBlue : {},
        )}
      >
        {transColumns.map(({ dataIndex, key, render, width, align = 'left' }) =>
          render ? (
            <span
              style={{ width, textAlign: align }}
              key={`${key}_${index}`}
              title={item[dataIndex]}
              className={styles.tableCell}
            >
              {render(item)}
            </span>
          ) : (
            <span
              style={{ width, textAlign: align }}
              key={`${key}_${index}`}
              title={item[dataIndex]}
              className={styles.tableCell}
            >
              {item[dataIndex]}
            </span>
          ),
        )}
      </div>
    ));

  /** 根据columns生成表格头内容 */
  const renderTableHeader = () => (
    <div className={styles.header}>
      {transColumns.map(({ title, dataIndex, width, align = 'left' }) => {
        return (
          <span
            style={{ width, textAlign: align }}
            key={dataIndex}
            className={styles.theadCell}
          >
            <span className={styles.tableCellContent}>{title}</span>
          </span>
        );
      })}
    </div>
  );

  return (
    <div className={styles.container}>
      {renderTableHeader()}
      {enabledScroll ? (
        <AutoVerticalRoll
          data={dataSource}
          isLoop={dataSource.length > 5}
          distance={5}
        >
          <div className={styles.tableContent}>{renderTbody(dataSource)}</div>
        </AutoVerticalRoll>
      ) : (
        <div className={styles.tableContent}>{renderTbody(dataSource)}</div>
      )}
    </div>
  );
};

export default CustomTable;
