import styles from './StoreSystem.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function StoreSystem() {
  const stores = [
    {
      id: 1,
      name: "Cửa hàng 1 - TP. Hồ Chí Minh",
      address: "123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
      phone: "0901 234 567",
      hours: "8:00 - 22:00",
      image: "/images/stores/store1.jpg",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4547.747878005976!2d108.2191132!3d16.0713917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836c79539cf%3A0x18389d1e94031607!2zNTYgxJAuIEzDqiBEdeG6qW4sIFRo4bqhY2ggVGhhbmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDA!5e1!3m2!1svi!2s!4v1760346605899!5m2!1svi!2s"
    },
    {
      id: 2,
      name: "Cửa hàng 2 - Hà Nội",
      address: "45 Cầu Giấy, Quận Cầu Giấy, Hà Nội",
      phone: "0902 345 678",
      hours: "8:30 - 21:30",
      image: "/images/stores/store2.jpg",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4417.4063842324995!2d105.79926077584142!3d21.032505787648766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab40e2d06e6f%3A0x938430dfbefa3a14!2zNDUgxJAuIEPhuqd1IEdp4bqleSwgUXVhbiBIb2EsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1760346826892!5m2!1svi!2s"
    },
    {
      id: 3,
      name: "Cửa hàng 3 - Đà Nẵng",
      address: "56 Lê Duẩn, Hải Châu, Đà Nẵng",
      phone: "0903 456 789",
      hours: "8:00 - 21:00",
      image: "/images/stores/store3.jpg",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4547.747760483981!2d108.2165382757603!3d16.071396839378632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836c79539cf%3A0x18389d1e94031607!2zNTYgxJAuIEzDqiBEdeG6qW4sIFRo4bqhY2ggVGhhbmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1760346920390!5m2!1svi!2s"
    }
  ];

  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className={cx("store-layout")}>
      {/* Cột trái - Danh sách cửa hàng */}
      <div className={cx("store-list")}>
        <h1>Hệ thống cửa hàng</h1>
        {stores.map(store => (
          <div
            key={store.id}
            className={cx("store-card", { active: selectedStore.id === store.id })}
            onClick={() => setSelectedStore(store)}
          >
            <img src={store.image} alt={store.name} />
            <div className={cx("store-info")}>
              <h2>{store.name}</h2>
              <p><b>Địa chỉ:</b> {store.address}</p>
              <p><b>Điện thoại:</b> {store.phone}</p>
              <p><b>Giờ mở cửa:</b> {store.hours}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cột phải - Bản đồ */}
      <div className={cx("store-map")}>
        <h2>Bản đồ cửa hàng</h2>
        <iframe
          title="Google Map"
          src={selectedStore.map}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default StoreSystem;
