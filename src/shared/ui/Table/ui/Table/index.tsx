import classNames from 'classnames'
import type { ReactNode, FC } from 'react'
import React, { memo } from 'react'

import { useScrollContext } from 'shared/lib'
import type { IPagination } from 'shared/model'
import PaginationObserver from 'shared/ui/PaginationObserver'

import { useTableStore } from '../../model'

import module from './Table.module.scss'

interface IProps {
  checkEmptyPeriod?: boolean
  content: ReactNode
  headContent: ReactNode
  pagination: IPagination | null
  paginationActionHandle?: (nextPage: number) => void
}

export const Table: FC<IProps> = memo(
  ({
    checkEmptyPeriod = true,
    content,
    headContent,
    pagination,
    paginationActionHandle
  }) => {
    const { isTablePaginationLoader, setIsTablePaginationLoader } =
      useTableStore()
    const listRef = useScrollContext()

    const observerHandler = (nextPage: number): void => {
      setIsTablePaginationLoader(true)
      if (paginationActionHandle) paginationActionHandle(nextPage)
      setTimeout(() => setIsTablePaginationLoader(false), 1000)
    }

    const classesTableBody = classNames(
      module.Table_body,
      !checkEmptyPeriod ? module.Table_short : ''
    )

    return (
      <table className={module.Table}>
        {checkEmptyPeriod && (
          <thead className={module.Table_head}>
            <tr>{headContent}</tr>
          </thead>
        )}
        <tbody className={classesTableBody} id="TableBody" ref={listRef}>
          {content}
          {pagination &&
            pagination?.current_page < pagination?.last_page &&
            !isTablePaginationLoader && (
              <tr className={module.Table_fill}>
                <td className={module.Table_fill}>
                  {paginationActionHandle && (
                    <PaginationObserver
                      actionHandle={observerHandler}
                      page={pagination?.current_page}
                    />
                  )}
                </td>
              </tr>
            )}
        </tbody>
      </table>
    )
  }
)
