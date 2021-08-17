import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

function Dialog(props, ref) {
    const { btn, title, width, height, onOK, onCancel, id,skin } = props;

    const dialogRef = useRef();
    const [news, setNews] = useState(null);
    useImperativeHandle(ref, () => ({
        getNews: () => {
            return news
        }
    }));
    useEffect(() => {
        if (props.visible) {
            openDialog();
        } else {
            self.dialog && self.dialog.close();
        }
    }, [props.visible]);
    const getNews = () => {
        console.log(1)
    }
    const openDialog = () => {
        var news
        news = new window.future.Dialog.createDialog({
            skin: skin,
            quickClose: true,
            title: title,
            content: dialogRef.current,
            width: width,
            height: height,
            okValue: '提交',
            cancelValue: '取消',
            id: id,
            onshow: () => {
                $('body').css('overflow', 'hidden')
            },
            onclose: () => {
                $('body').css('overflow', 'auto')
                props.onClose && props.onClose();
            },
            ok: function () {
                onOK && onOK();

                return false
            },
            cancel: function () {
                onCancel && onCancel()
            }
        });
        setNews(news)
        if (!btn) {
            $('.ui-dialog-footer').hide()
        }
    };

    return (
        <div hidden ref={dialogRef} className="dialog-wrap">
            <div className="dialog-content">
                {props.children}
            </div>
        </div>
    );
}
export default Dialog = forwardRef(Dialog)




