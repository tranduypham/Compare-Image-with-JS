function startCmp(parrentClass) {
    var parentElement = document.querySelector(parrentClass);
    var overlay = document.querySelector(".overlay");

    // Lấy vị trí ban đầu của tab Overlay
    var w = overlay.offsetWidth;//Lấy chiều rộng của overlay
    var h = overlay.offsetHeight;//Lấy chiều cao của overlay
    let click = 0;
    var button;



    // Tạo button
    button = document.createElement("div");//Tạo 1 div
    button.classList.add("button");//Class của div là button
    overlay.parentElement.insertBefore(button, overlay);//Thêm button vủa tạo ở trước thẻ div của Overlay

    //Chỉnh lại vị trí cho button
    //Đặt width của overlay = 0
    overlay.style.width = 0 + "px";//Để bức ảnh 1 hiện ra

    //Đưa button về vị trí chính giữa
    button.style.top = (h / 2) + "px";
    button.style.left = 0;
    button.style.transform = "translate(-50%,-50%)";
    // alert(w)

    // Tạo sự kiện
    // Khi bấm vào button
    button.addEventListener("mousedown", function (event) {
        event.preventDefault;//Ngăn chặn sự kiện mặc định xảy ra (kiểu ấn a nhưng không chuyển đi sang trang khác ấy) - (Mà chả hiểu ngăn chặn sự kiện gì ở đây nữa)
        console.log("down " + click);
        click = 1;
        window.addEventListener("mousemove", function (event) {
            console.log("move " + click);
            console.log(click);
            //Biến chỉ vị trí hiện tại của của con trỏ chuột
            var vitri;
            vitri = getButtPosition(event);//Con trở chuột ở đâu thì width của overlay sẽ kéo dài ra đến ấy.
            // Nếu như đang mouseup và di chuyển chuột thì
            if (click == 0) {//Chú ý bằng bằng
                console.log(click);
                return false;
            }
            if (click == 1) {//Chú ý bằng bằng
                console.log(click);
                // Nếu vị trí button giảm quá 0 <=> Đi ra khỏi khung của overlay
                if (vitri < 0) { vitri = 0; }
                // Nếu vị trí button tăng quá w <=> Đi ra khỏi khung của overlay
                if (vitri > w) { vitri = w; }
            }
            // Hàm để thay đổi width của overlay + thay đổi vị trí của button
            slide(vitri);
        });

    });

    button.addEventListener("mouseup", function (event) {
        console.log("up " + click);
        // alert("hello");
        click = 0;
    });

    function slide(vitri) {
        button.style.left = vitri + "px";
        overlay.style.width = vitri + "px";
    }

    function getButtPosition(event) {
        var a;
        var x = 0;
        event = window.event;
        //a là thông số vị trí hiện tại của cửa số overlay
        //Bao gồm khoảng cách của overlay với lề top, left, right, bottom của trang
        // Cho biết cả width của chính div.overlay
        //x và y là tọa độ ??? gồn giống mấy cái trên => Không quan trọng
        a = overlay.getBoundingClientRect();
        // console.log(a);
        x = event.screenX;//x là vị trí của con trỏ chuột trên màn hình

        return x - a.left;//Chính là width mới của overlay
    }
    // Khi nhả chuột rời khỏi button

}

startCmp(".container");