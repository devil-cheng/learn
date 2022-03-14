import React, { useContext } from 'react';
import { ConfigContext } from 'antd/es/config-provider/context';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';

export type PaginationValue = {
    current: number;
    pageSize?: number;
};

export type PaginationProps = {
    current: number;
    total: number;
    pageSize?: number;
    pageSizes?: number[];
    onChange: (value: PaginationValue) => void;
};

const Pagination = (props: PaginationProps) => {
    const { current = 1, total = 0, pageSize = 10, pageSizes = [10, 20, 50, 100, 200], onChange } = props;

    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);
    const prefixCls = getPrefixCls('pagination');

    const ref = React.useRef<HTMLElement & typeof Button>(null);
    const pageSizeRef = React.useRef<HTMLElement & typeof Button>(null);

    const totalPages = React.useMemo(
        () =>
            (total % pageSize === 0
                ? parseInt((total / pageSize).toString(), 10)
                : parseInt((total / pageSize).toString(), 10) + 1) || 1,
        [total, pageSize]
    );

    const pagerList = React.useMemo(() => [...[new Array(totalPages)]].map((_, index) => index + 1), [totalPages]);
    const [isPageSizesVisible, setPageSizeVisible] = React.useState(false);

    const handleSelectPageSize = (value: number) => () => {
        setPageSizeVisible(false);
        onChange({ pageSize: Number(value), current: 1 });
    };

    const handleSelectPage = (item: number) => () => {
        onChange({ current: Number(item) });
    };

    const handlePrev = () => {
        const currentPage = current === 1 ? 1 : current - 1;
        onChange({ current: currentPage });
    };

    const handleNext = () => {
        const currentPage = current === totalPages ? totalPages : current + 1;
        onChange({ current: currentPage });
    };

    const pages = (
        <Menu className={`${prefixCls}-menu`}>
            {pagerList.map(item => (
                <Menu.Item
                    key={item}
                    className={`${Number(item) === current ? 'ant-dropdown-menu-item-active' : ''}`}
                    onClick={handleSelectPage(item)}
                >
                    {item}
                </Menu.Item>
            ))}
        </Menu>
    );

    const pageSizesMenu = (
        <Menu className={`${prefixCls}-menu`}>
            {pageSizes.map(item => (
                <Menu.Item
                    key={item}
                    className={`${item === pageSize ? 'ant-dropdown-menu-item-active' : ''}`}
                    onClick={handleSelectPageSize(item)}
                >
                    {`${item} 条/页`}
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <div className={`${prefixCls}`} style={{ display: total === 0 ? 'none' : 'flex' }}>
            <div className={`${prefixCls}-total`}>{`共 ${total} 条`}</div>
            <Dropdown
                visible={isPageSizesVisible}
                onVisibleChange={val => setPageSizeVisible(val)}
                placement="topLeft"
                overlay={pageSizesMenu}
                getPopupContainer={dom => (pageSizeRef?.current?.appendChild ? pageSizeRef.current : dom)}
                trigger={['click']}
                overlayStyle={{
                    border: '1px solid #ddd',
                    borderRadius: 4
                }}
            >
                <Button className={`${prefixCls}-pageSize`} ref={pageSizeRef}>
                    {`${pageSize} 条/页`} <DownOutlined rotate={isPageSizesVisible ? 180 : 0} />
                </Button>
            </Dropdown>

            <Button.Group className={`${prefixCls}-pageBtn`}>
                <Button
                    icon={<LeftOutlined />}
                    className={`${prefixCls}-pageSize-prevBtn`}
                    onClick={handlePrev}
                    disabled={current === 1}
                />
                <Dropdown
                    placement="topLeft"
                    overlay={pages}
                    trigger={['click']}
                    getPopupContainer={dom => (ref?.current?.appendChild ? ref.current : dom)}
                    overlayStyle={{
                        maxHeight: 160,
                        overflowY: pagerList.length > 5 ? 'scroll' : 'hidden',
                        border: '1px solid #ddd',
                        borderRadius: 4
                    }}
                    disabled={totalPages === 1}
                >
                    <Button ref={ref}>
                        {/* v46版本的火狐不支持将flex 布局加在button上 */}
                        <div className={`${prefixCls}-pageWrap`}>
                            <div>{current}</div>
                            <div className={`${prefixCls}-iconGroup`}>
                                <UpOutlined />
                                <DownOutlined />
                            </div>
                        </div>
                    </Button>
                </Dropdown>
                <Button
                    icon={<RightOutlined />}
                    className={`${prefixCls}-pageSize-nextBtn`}
                    onClick={handleNext}
                    disabled={current === totalPages}
                />
            </Button.Group>

            <div className={`${prefixCls}-totalPage`}>{`共 ${totalPages} 页`}</div>
        </div>
    );
};

export default React.memo(Pagination);
