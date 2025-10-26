function Blog2({image, title}){
    return(
        <>
        <img style={{width: '100%', height: '500px'}} src={image}/>
        <h2>{title}</h2>
        <div>
            <p>
                Điện thoại gập là một xu hướng công nghệ di động đột
                phá với thiết kế độc đáo, mang lại trải nghiệm màn hình
                lớn hơn và khả năng đa nhiệm hiệu quả hơn so với điện thoại truyền thống.
                Tuy nhiên, chúng vẫn còn tồn tại những hạn chế về giá bán cao,
                độ bền và sự tiện lợi khi sử dụng, khiến nhiều người dùng còn e dè khi quyết định mua.
            </p>
            <h2>Ưu điểm của điện thoại gập</h2>
            <p>
                <b>Thiết kế độc đáo và thời thượng:</b> Gây ấn tượng với khả năng gập gọn gàng hoặc mở
                ra như một cuốn sổ, mang lại cảm giác mới lạ, nổi bật và thể hiện cá tính của người dùng.
            </p>
            <p>
                <b>Màn hình lớn:</b> Khi mở ra, màn hình lớn mang lại trải nghiệm tương tự máy tính bảng,
                lý tưởng cho việc xem phim, đọc tài liệu, chỉnh sửa và đa nhiệm.
            </p>
            <p>
                <b>Tính đa nhiệm hiệu quả:</b> Tính đa nhiệm hiệu quả: Màn hình lớn cho phép hiển thị nhiều ứng dụng
                 cùng lúc, giúp công việc và giải trí hiệu quả hơn.
            </p>
            <p>
                <b>Tiện lợi và di động:</b> Thiết kế gập giúp thiết bị nhỏ gọn hơn khi mang theo, trong khi vẫn cung cấp
                không gian màn hình lớn khi cần.
            </p>
            <h2>Nhược điểm của điện thoại gập</h2>
            <p>
                <b>Giá thành cao:</b> Công nghệ màn hình gập mới và phức tạp nên giá bán của điện thoại gập thường cao hơn
                nhiều so với điện thoại truyền thống.
            </p>
            <p>
                <b>Độ bền:</b> Đây là mối lo ngại lớn nhất, đặc biệt là về khả năng chống bụi và độ bền của màn hình sau thời
                gian dài sử dụng.
            </p>
        </div>
        </>
    )
}

export default Blog2;