-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 29, 2020 lúc 08:58 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `news_website`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `accID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `time_up` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`accID`, `fullname`, `username`, `password`, `email`, `type`, `time_up`) VALUES
('000001', '', 'admin', 'admin', 'admin', 1, '0000-00-00 00:00:00'),
('000002', '', 'writer', '123', 'writer@gmail.com', 2, '0000-00-00 00:00:00'),
('000003', 'Nguyễn Xuân Trường', 'approver', '123', 'approver@gmail.com', 3, '0000-00-00 00:00:00'),
('000004', 'Nguyễn Trọng Hùng', 'norAcc', '123', 'hung@gmail.com', 4, '0000-00-00 00:00:00'),
('000005', 'Trần Trọng Trí', 'preAcc', '123', 'tri@gmail.com', 4, '2020-06-30 08:20:00'),
('000006', 'Trần Minh Tuấn', 'preAcc1', '123', 'tuan@gmail.com', 4, '2020-07-29 23:41:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `catID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `catName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`catID`, `catName`) VALUES
('cat01', 'Công nghệ'),
('cat02', 'Văn hóa'),
('cat03', 'Xã hội'),
('cat04', 'Thể thao'),
('cat05', 'Y Tế'),
('cat06', 'Giáo dục');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `postID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `accID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `STT` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `content` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_categories`
--

CREATE TABLE `detail_categories` (
  `catID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `catName` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_categories`
--

INSERT INTO `detail_categories` (`catID`, `catName`) VALUES
('cat01', 'CNTT - Viễn thông'),
('cat01', 'Thiết bị - Phần cứng'),
('cat02', 'Ẩm thực'),
('cat02', 'Du lịch'),
('cat02', 'Môi trường'),
('cat02', 'Nghệ thuật'),
('cat03', 'Giao thông'),
('cat03', 'Thời sự'),
('cat04', 'Bóng đá thế giới'),
('cat04', 'Bóng đá Việt Nam'),
('cat04', 'Quần vợt'),
('cat05', 'Covid19'),
('cat05', 'Sức khỏe'),
('cat06', 'Đào tạo - Thi cử'),
('cat06', 'Học bổng - Du học');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `postsID` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `catID` char(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `small_avatar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `big_avatar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `writer` char(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approver` char(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`postsID`, `title`, `content`, `catID`, `small_avatar`, `big_avatar`, `writer`, `approver`, `date`, `views`, `status`) VALUES
('000001', 'Những thủ thuật với bàn phím iOS có thể bạn đã biết', '<p>Nếu đang d&ugrave;ng&nbsp;<a class=\"Tinhte_XenTag_TagLink\" href=\"https://tinhte.vn/iphone/\">iPhone</a>&nbsp;hoặc iPad th&igrave; những&nbsp;<a class=\"Tinhte_XenTag_TagLink\" href=\"https://tinhte.vn/thu-thuat/\">thủ thuật</a>&nbsp;sau đ&acirc;y sẽ gi&uacute;p bạn thao t&aacute;c tiện lợi, dễ d&agrave;ng v&agrave; tiết kiệm thời gian,... C&oacute; thể sẽ c&oacute; những mẹo bạn đ&atilde; qu&aacute; quen thuộc rồi, nhưng c&ugrave;ng tham khảo xem bạn đ&atilde; th&agrave;nh thạo hết chưa nh&eacute;!<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>1. Sử dụng QuickPath</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050818_QuickPath.gif\" alt=\"QuickPath.gif\" data-height=\"1386\" data-width=\"640\" /></span></span></strong>​</div>\r\n<p><br />QuickPath tr&ecirc;n&nbsp;<a class=\"Tinhte_XenTag_TagLink\" href=\"https://tinhte.vn/tags/ban-phim/\">b&agrave;n ph&iacute;m</a>&nbsp;iPhone sẽ gi&uacute;p bạn nhập văn bản nhanh hơn bằng c&aacute;ch vuốt thay v&igrave; nhấn. Muốn nhập một từ n&agrave;o đ&oacute; bạn chỉ cần chạm tay v&agrave;o chữ c&aacute;i đầu ti&ecirc;n rồi vuốt lần lượt sang c&aacute;c chữ c&aacute;i tiếp theo cho đến khi đ&aacute;nh vần hết to&agrave;n bộ một từ (hết một chữ mới nhấc tay l&ecirc;n), khi đ&oacute; từ muốn viết sẽ xuất hiện tr&ecirc;n m&agrave;n h&igrave;nh. Nếu QuickPath hiểu sai c&aacute;c thao t&aacute;c vuốt th&igrave; xo&aacute; v&agrave; vuốt lại, cơ bản l&agrave; khi l&agrave;m quen được rồi bạn sẽ &iacute;t g&otilde; sai v&agrave; tốc độ cũng nhanh hơn rất nhiều.<br /><br />Bạn cũng c&oacute; thể d&ugrave;ng QuickPath tr&ecirc;n iPad bằng c&aacute;ch k&iacute;ch hoạt b&agrave;n ph&iacute;m nổi thu nhỏ tr&ecirc;n thiết bị bằng c&aacute;ch chụm hai ng&oacute;n tay v&agrave;o giữa b&agrave;n ph&iacute;m v&agrave; khi đ&oacute; thao t&aacute;c tương tự như tr&ecirc;n iPhone.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>2. Thu nhỏ v&agrave; di chuyển b&agrave;n ph&iacute;m iPad</strong></h2>\r\n<p><br />Chụm bằng hai ng&oacute;n tay v&agrave;o giữa b&agrave;n ph&iacute;m để thu nhỏ lại th&agrave;nh b&agrave;n ph&iacute;m cỡ iPhone.<br />Zoom ra để quay trở lại b&agrave;n ph&iacute;m b&igrave;nh thường.<br />K&eacute;o v&agrave; thả bằng thanh ở ph&iacute;a dưới để di chuyển b&agrave;n ph&iacute;m n&agrave;y bất cứ nơi n&agrave;o tr&ecirc;n m&agrave;n h&igrave;nh.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>3. K&eacute;o v&agrave; thả con trỏ</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050815_keo_va_tha.gif\" alt=\"k&eacute;o v&agrave; thả.gif\" data-height=\"860\" data-width=\"397\" /></span></span></strong>​</div>\r\n<p><br />Tr&ecirc;n iPhone hoặc iPad, bạn c&oacute; thể dễ d&agrave;ng k&eacute;o v&agrave; thả con trỏ di chuyển bất cứ nơi n&agrave;o bạn muốn để bắt đầu nhập văn bản ở một nơi mới, bất kể bạn đang sử dụng ứng dụng n&agrave;o.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>4. Sử dụng Trackpad Mode bằng ph&iacute;m Space để điều khiển con trỏ</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050823_trackpad_mode.gif\" alt=\"trackpad mode.gif\" data-height=\"800\" data-width=\"369\" /></span></span></strong>​</div>\r\n<p><br />Chạm v&agrave; giữ n&uacute;t Space đến khi b&agrave;n ph&iacute;m kh&ocirc;ng c&ograve;n k&yacute; tự n&agrave;o nữa, rồi di chuyển ng&oacute;n tay ở khu vực b&agrave;n ph&iacute;m để di chuyển con trỏ văn bản đến bất cứ vị tr&iacute; n&agrave;o bạn cần. Bạn cũng c&oacute; thể sử dụng chế độ n&agrave;y để chọn văn bản tr&ecirc;n m&agrave;n h&igrave;nh, trong khi di con trỏ, d&ugrave;ng ng&oacute;n tay kh&aacute;c chạm v&agrave;o v&ugrave;ng văn bản cần chọn.<br /><br />Tr&ecirc;n iPad, bạn c&oacute; thể k&iacute;ch hoạt chế độ trackpad đơn giản bằng c&aacute;ch di chuyển hai ng&oacute;n tay tr&ecirc;n b&agrave;n ph&iacute;m.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>5. Nhấn đ&uacute;p hoặc 3 lần để chọn</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050816_nhan_3_lan_de_chon.gif\" alt=\"nhấn 3 lần để chọn.gif\" data-height=\"800\" data-width=\"369\" /></span></span></strong>​</div>\r\n<p><br />Khi cần chọn văn bản để chỉnh sửa, sao ch&eacute;p hay cắt bạn c&oacute; thể nhấn đ&uacute;p để chọn một từ hoặc nhấn ba lần để chọn to&agrave;n bộ đoạn văn.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>6. Chụm để sao ch&eacute;p, cắt v&agrave; d&aacute;n</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050813_chum_de_sao_chep-06-16_18_08_32.gif\" alt=\"chụm để sao ch&eacute;p-06-16 18_08_32.gif\" data-height=\"1000\" data-width=\"461\" /></span></span></strong>​</div>\r\n<p><br />Khi chọn được v&ugrave;ng văn bản mong muốn, chỉ cần d&ugrave;ng 3 ng&oacute;n tay chụm lại tr&ecirc;n m&agrave;n h&igrave;nh để thực hiện thao t&aacute;c sao ch&eacute;p. Tiếp tục thao t&aacute;c như vậy lần nữa để cắt văn bản. Sau đ&oacute; chọn vị tr&iacute; muốn d&aacute;n văn bản, thao t&aacute;c ngược lại (vuốt mở 3 ng&oacute;n tay từ trong ra ngo&agrave;i) l&agrave; đ&atilde; c&oacute; thể nhanh ch&oacute;ng d&aacute;n văn bản đ&atilde; chọn.<br /><br />Thao t&aacute;c n&agrave;y sử dụng tr&ecirc;n iPad sẽ đ&atilde; hơn, tiện hơn v&igrave; c&oacute; nhiều kh&ocirc;ng gian hiển thị hơn tr&ecirc;n iPhone.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>7. Sao ch&eacute;p v&agrave; d&aacute;n với bảng tạm</strong></h2>\r\n<p><br />Bạn c&oacute; thể d&ugrave;ng bảng tạm để sao ch&eacute;p văn bản từ chiếc m&aacute;y n&agrave;y v&agrave; d&aacute;n n&oacute; v&agrave;o m&aacute;y kh&aacute;c khi đang c&ugrave;ng sử dụng nhiều thiết bị của Apple.<br />V&iacute; dụ, m&igrave;nh sao ch&eacute;p 1 đoạn văn bản tr&ecirc;n chiếc iPhone, sau đ&oacute; tr&ecirc;n Macbook nhấn Command + V th&igrave; đoạn văn bản đ&oacute; sẽ được d&aacute;n ở vị tr&iacute; m&igrave;nh chọn tr&ecirc;n Mac.<br /><br />Khi đ&oacute; phải đảm bảo cả hai thiết bị được kết nối với c&ugrave;ng một mạng Wifi v&agrave; bật Bluetooth. Ngo&agrave;i ra, cần đảm bảo cả hai đều sử dụng c&ugrave;ng một t&agrave;i khoản Apple ID.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>8. Vuốt để ho&agrave;n t&aacute;c v&agrave; l&agrave;m lại</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050826_vuot_hoann_tac.gif\" alt=\"vuốt ho&agrave;nn t&aacute;c.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />Khi g&otilde; văn bản, ph&aacute;t hiện bị sai, chỉ cần d&ugrave;ng 3 ng&oacute;n tay vuốt từ phải sang tr&aacute;i để ho&agrave;n t&aacute;c h&agrave;nh động cuối c&ugrave;ng, c&oacute; thể thực hiện nhiều lần để li&ecirc;n tục ho&agrave;n t&aacute;c c&aacute;c chỉnh sửa trước đ&oacute; đ&atilde; thực hiện hoặc c&aacute;c từ cuối c&ugrave;ng bạn đ&atilde; nhập.<br /><br />Nếu lỡ tay vuốt li&ecirc;n tục ho&agrave;n t&aacute;c nhiều lần, qu&aacute; lố, cũng kh&ocirc;ng sao, khi đ&oacute; bạn chỉ cần vuốt từ tr&aacute;i sang phải bằng ba ng&oacute;n tay để l&agrave;m lại.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>9.Lắc để ho&agrave;n t&aacute;c</strong></h2>\r\n<p><br />Tr&ecirc;n những chiếc m&agrave;n h&igrave;nh nhỏ thao t&aacute;c vuốt bằng 3 ng&oacute;n tay thấy kh&oacute;, bạn c&oacute; thể lựa chọn thủ thuật tiện hơn l&agrave; bầm chắc chiếc iPhone/iPad v&agrave; lắc tầm 3 lần, một cửa sổ xuất hiện hỏi bạn c&oacute; muốn ho&agrave;n t&aacute;c h&agrave;nh động cuối c&ugrave;ng của m&igrave;nh kh&ocirc;ng, bấm c&oacute; hoặc kh&ocirc;ng l&agrave; được. V&iacute; dụ như lỡ tay xo&aacute; 1 đoạn văn bản đ&atilde; viết, kh&ocirc;ng việc g&igrave; phải xoắn, chỉ cần cầm điện thoại l&ecirc;n v&agrave; lắc th&ocirc;i!<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>10. Nhấn đ&uacute;p Space để bấm dấu chấm</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050817_nhan_dau_cham.gif\" alt=\"nhấn dấu chấm.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />Khi g&otilde; một đoạn văn bản d&agrave;i bạn ho&agrave;n to&agrave;n c&oacute; thể nhấn đ&uacute;p v&agrave;o Space để tự động đ&aacute;nh dấu chấm m&agrave; kh&ocirc;ng cần phải chuyển sang c&aacute;c k&yacute; hiệu. Rất nhanh!<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>11. Thủ thuật với ph&iacute;m Shift</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050821_thu_thuat_phim_shift.gif\" alt=\"thủ thuật ph&iacute;m shift.gif\" data-height=\"900\" data-width=\"415\" /></span></span>​</div>\r\n<p><br />Muốn viết hoa một chữ bất kỳ bạn chỉ cần vuốt từ ph&iacute;m Shift (dấu mũi t&ecirc;n hướng l&ecirc;n) sang chữ c&aacute;i bạn muốn viết hoa. Để sử dụng thủ thuật n&agrave;y tr&ecirc;n iPad bạn phải k&iacute;ch hoạt b&agrave;n ph&iacute;m nổi thu nhỏ.<br />Như b&igrave;nh thường, bạn c&oacute; thể nhấn 2 lần v&agrave;o ph&iacute;m Shift để bật Caps Lock cho b&agrave;n ph&iacute;m.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>12. Chuyển đổi giữa b&agrave;n ph&iacute;m chữ v&agrave; k&yacute; hiệu</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050814_doi_ban_phim.gif\" alt=\"đổi b&agrave;n ph&iacute;m.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />B&igrave;nh thường khi g&otilde; văn bản, bạn thường hay g&otilde; v&agrave;o ph&iacute;m 123 ở g&oacute;c dưới b&ecirc;n tr&aacute;i để t&igrave;m c&aacute;c k&yacute; tự v&agrave; rồi nhấn lại ph&iacute;m ABC để quay lại. Bạn ho&agrave;n to&agrave;n c&oacute; thể nhanh ch&oacute;ng nhập một số, dấu chấm c&acirc;u hoặc chữ c&aacute;i bằng c&aacute;ch vuốt từ ph&iacute;m 123 đến k&yacute; tự bạn muốn, khi bỏ ra b&agrave;n ph&iacute;m sẽ tự động về lại mặc định.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>13. Vuốt xuống ph&iacute;m số cho c&aacute;c k&yacute; tự thay thế tr&ecirc;n iPad</strong></h2>\r\n<p><br />Tr&ecirc;n b&agrave;n ph&iacute;m iPad, bạn sẽ thấy c&aacute;c k&yacute; tự lu&ocirc;n xuất hiện tr&ecirc;n đầu của mỗi chữ số. Chỉ cần vuốt xuống để dễ d&agrave;ng nhập số v&agrave; c&aacute;c k&yacute; tự m&agrave; kh&ocirc;ng cần chuyển đổi b&agrave;n ph&iacute;m.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>14. Chạm v&agrave; giữ để th&ecirc;m tuỳ chọn</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050819_them_chu-06-16_18_20_17.gif\" alt=\"th&ecirc;m chữ-06-16 18_20_17.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />Nếu muốn sử dụng những k&yacute; tự c&oacute; dấu bạn chỉ cần chạm v&agrave; giữ v&agrave;o 1 chữ c&aacute;i đ&oacute;, b&agrave;n ph&iacute;m sẽ hiển thị tất cả c&aacute;c biến thể c&oacute; dấu của từ đ&oacute; cho bạn chọn.<br />C&aacute;i n&agrave;y rất tiện khi bạn muốn g&otilde; ng&ocirc;n ngữ c&oacute; dấu như tiếng T&acirc;y Ban Nha hay tiếng Đức m&agrave; kh&ocirc;ng cần phải thay đổi b&agrave;n ph&iacute;m tr&ecirc;n điện thoại.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>15. V&ocirc; hiệu h&oacute;a t&iacute;nh năng QuickType</strong></h2>\r\n<p><strong><br /><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050849_du_doan_chu.jpg\" alt=\"dự đo&aacute;n chữ.jpg\" data-height=\"1268\" data-width=\"2048\" /></span></span></strong><br /><br />B&ecirc;n cạnh t&iacute;nh năng tự động sửa lỗi, b&agrave;n ph&iacute;m trong&nbsp;<a class=\"Tinhte_XenTag_TagLink\" href=\"https://tinhte.vn/ios/\">iOS</a>&nbsp;v&agrave; iPadOS cũng c&oacute; t&iacute;nh năng dự đo&aacute;n văn bản m&agrave; Apple gọi l&agrave; QuickType. Khi bạn nhấn v&agrave;o một trong những k&yacute; tự n&agrave;o đ&oacute; bất kỳ m&agrave; kh&ocirc;ng cần phải nhập xong th&igrave; n&oacute; sẽ xuất hiện 3 từ dự đo&aacute;n l&agrave; từ m&agrave; bạn muốn g&otilde; ở đầu b&agrave;n ph&iacute;m.<br /><br />Để tắt ho&agrave;n to&agrave;n t&iacute;nh năng QuickType n&agrave;y để c&oacute; th&ecirc;m kh&ocirc;ng gian tr&ecirc;n m&agrave;n h&igrave;nh bạn v&agrave;o<strong>&nbsp;C&agrave;i đặt</strong>&nbsp;&gt;&nbsp;<strong>C&agrave;i đặt chung</strong>&nbsp;&gt;&nbsp;<strong>B&agrave;n ph&iacute;m</strong>&nbsp;&gt;&nbsp;<strong>Tắt Dự đo&aacute;n</strong>.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>16. Tạo Shortcut tự động thay thế văn bản</strong></h2>\r\n<p><strong><br /><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050850_thay_the_van_ban.jpg\" alt=\"thay thế văn bản.jpg\" data-height=\"1268\" data-width=\"2048\" /></span></span></strong><br /><br />Với những từ, cụm từ hoặc c&acirc;u ho&agrave;n chỉnh m&agrave; bạn nhập thường xuy&ecirc;n nhập v&agrave; sử dụng nhiều bạn c&oacute; thể chọn t&iacute;nh năng&nbsp;<strong>Thay thế văn bản</strong>&nbsp;để biến n&oacute; th&agrave;nh ph&iacute;m tắt m&agrave; nhập nhanh hơn.<br /><br />C&aacute;ch bật, v&agrave;o&nbsp;<strong>C&agrave;i đặt</strong>&nbsp;&gt;&nbsp;<strong>C&agrave;i đặt chung</strong>&nbsp;&gt;<strong>&nbsp;B&agrave;n ph&iacute;m</strong>&nbsp;&gt;&nbsp;<strong>Thay thế văn bản</strong>. Sau đ&oacute; nhấn v&agrave;o n&uacute;t&nbsp;<strong>Th&ecirc;m ( + )</strong>&nbsp;v&agrave; nhập cụm từ ho&agrave;n chỉnh c&ugrave;ng với ph&iacute;m tắt bạn muốn sử dụng. Phải nhớ l&agrave; m&igrave;nh đ&atilde; nhập k&yacute; tự n&agrave;o nh&aacute;, để những lần sử dụng sau bạn chỉ cần g&otilde; đ&uacute;ng ph&iacute;m tắt đ&oacute; rồi nhấn Space l&agrave; n&oacute; tự động ra.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>17. Tắt t&iacute;nh năng phiền phức tự động sửa lỗi</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050824_tu_dong_sua.gif\" alt=\"tự động sửa.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />T&iacute;nh năng tự động sửa lỗi kh&aacute; tiện khi bạn nhập sai ch&iacute;nh tả, tuy nhi&ecirc;n n&oacute; lại phiền hơn bao giờ hết khi tự động thay thế từ n&agrave;y th&agrave;nh một từ kh&aacute;c, rồi m&igrave;nh lại nhanh tay bấm gửi, tạo th&agrave;nh 1 c&acirc;u kh&ocirc;ng mong muốn, g&acirc;y bực m&igrave;nh.<br /><br />Để ho&agrave;n t&aacute;c lỗi tự động sửa n&agrave;y, bạn chạm v&agrave;o n&uacute;t xo&aacute;, khi đ&oacute;, tr&ecirc;n đầu từ sửa trong văn bản sẽ hiện lại từ bạn đ&atilde; g&otilde; trước đ&oacute;, v&agrave; c&ograve;n c&oacute; cả đề xuất những từ c&oacute; thể thay thế, chỉ cần chọn từ đ&uacute;ng th&ocirc;i.<br />Hoặc bạn c&oacute; thể tắt lu&ocirc;n t&iacute;nh năng Tự động sửa bằng c&aacute;ch v&agrave;o&nbsp;<strong>C&agrave;i đặt</strong>&nbsp;&gt;&nbsp;<strong>C&agrave;i đặt chung</strong>&nbsp;&gt;&nbsp;<strong>B&agrave;n ph&iacute;m</strong>&nbsp;&gt;&nbsp;<strong>Tắt Tự động sửa</strong>.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>18. Sử dụng micro để nhập văn bản</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050825_voice.gif\" alt=\"voice.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />Cả iOS v&agrave; iPadOS đều t&iacute;ch hợp t&iacute;nh năng nhập văn bản bằng giọng n&oacute;i trong b&agrave;n ph&iacute;m, ngay cả khi bạn kh&ocirc;ng kết nối với internet.<br /><br />Khi mở b&agrave;n ph&iacute;m, nhấn v&agrave;o biểu tượng micro ở g&oacute;c dưới b&ecirc;n phải v&agrave; bắt đầu n&oacute;i, khi kết th&uacute;c chạm v&agrave;o biểu tượng s&oacute;ng để d&ugrave;ng v&agrave; quay lại b&agrave;n ph&iacute;m mặc định. Khi đ&oacute; từ bạn muốn nhập sẽ hiện ra, với những từ c&oacute; thể sai sẽ được gạch ch&acirc;n m&agrave;u xanh lam, kiểm tra xem đ&uacute;ng &yacute; bạn kh&ocirc;ng nh&aacute;!<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>19. Tra cứu từ điển</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050822_tra_cuu.gif\" alt=\"tra cứu.gif\" data-height=\"900\" data-width=\"415\" /></span></span>​</div>\r\n<p><br />Bạn c&oacute; thể tra cứu định nghĩa của một từ bạn vừa g&otilde;/ một từ bất kỳ m&agrave; kh&ocirc;ng cần rời khỏi ứng dụng đang theo d&otilde;i bằng c&aacute;ch nhấn đ&uacute;p để chọn từ đ&oacute;, rồi nhấn chọn Tra cứu tr&ecirc;n thanh menu hiện l&ecirc;n.<br />Thủ thuật n&agrave;y rất tiện khi duyệt web trong Safari hay ứng dụng đọc s&aacute;ch.<br /><br /></p>\r\n<h2 class=\"TinhteMods_HeadingTag TinhteMods_HeadingTagH2\"><strong>20. K&iacute;ch hoạt t&iacute;nh năng g&otilde; một tay</strong></h2>\r\n<p>&nbsp;</p>\r\n<div><strong><span class=\"bdImage_attachImage\"><span class=\"inner\"><img src=\"https://photo2.tinhte.vn/data/attachment-files/2020/06/5050820_thu_nho_ban_phim-06-16_18_35_14.gif\" alt=\"thu nhỏ b&agrave;n ph&iacute;m-06-16 18_35_14.gif\" data-height=\"900\" data-width=\"415\" /></span></span></strong>​</div>\r\n<p><br />Khi k&iacute;ch hoạt t&iacute;nh năng n&agrave;y, b&agrave;n ph&iacute;m thu nhỏ sẽ hiện b&ecirc;n tr&aacute;i hoặc phải m&agrave;n h&igrave;nh để bạn c&oacute; thể dễ d&agrave;ng g&otilde; bằng 1 tay. Chạm v&agrave; giữ biểu tượng b&agrave;n ph&iacute;m (h&igrave;nh quả địa cầu) ở tr&aacute;i hoặc phải m&agrave;n h&igrave;nh, một menu sẽ hiện l&ecirc;n, rồi bạn nhấn chọn b&agrave;n ph&iacute;m b&ecirc;n tr&aacute;i hoặc phải ở dưới c&ugrave;ng. Muốn quay lại b&agrave;n ph&iacute;m ở giữa bạn chỉ cần nhấn v&agrave;o dấu mũi t&ecirc;n ở b&ecirc;n cạnh.</p>', 'cat01', '', '', '000002', '000003', '0000-00-00 00:00:00', 0, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tags`
--

CREATE TABLE `tags` (
  `tagID` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `postID` char(6) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accID`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`catID`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`postID`,`accID`,`STT`);

--
-- Chỉ mục cho bảng `detail_categories`
--
ALTER TABLE `detail_categories`
  ADD PRIMARY KEY (`catID`,`catName`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postsID`);

--
-- Chỉ mục cho bảng `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
