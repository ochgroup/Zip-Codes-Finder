import { createClient } from '@supabase/supabase-js';
import { PostalRecord, SearchFilters, SearchType, DashboardStats } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Supabase Configuration ---
// Host from your connection string: db.jbylarqccisjdpaogibu.supabase.co
const SUPABASE_URL = 'https://jbylarqccisjdpaogibu.supabase.co';
// TODO: Replace with your actual Supabase Anon Key from Project Settings > API
const SUPABASE_KEY = (typeof process !== 'undefined' && process.env.SUPABASE_KEY) || ''; 

// Initialize client only if key is present
const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let postalData: PostalRecord[] = [
  { id: '445', pincode: '05224', officeName: 'Fatto Mand PO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '446', pincode: '05225', officeName: 'Fazal Fruit Market PO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '447', pincode: '34130', officeName: 'Fazal Garh', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '448', pincode: '34210', officeName: 'Fazal Nagar', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '449', pincode: '03424', officeName: 'Fazal Nagar PO', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '450', pincode: '39172', officeName: 'Feroz Wattan', city: 'Qila Sheikhupura', district: 'Sheikhupura', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '451', pincode: '64070', officeName: 'Feroza', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '452', pincode: '05305', officeName: 'Ferozpur Road PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '453', pincode: '05415', officeName: 'Flatties Hotel PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '454', pincode: '62020', officeName: 'Fort Abbas', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '455', pincode: '62000', officeName: 'Fort Morot', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '456', pincode: '32320', officeName: 'Fort Munroo', city: 'Dera Ghazi Khan', district: 'Dera Ghazi Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '457', pincode: '05433', officeName: 'Fortress Stadium PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '458', pincode: '43540', officeName: 'Furmali', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '459', pincode: '61000', officeName: 'Gaggo', city: 'Vehari', district: 'Vehari', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '460', pincode: '43330', officeName: 'Gaggon', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '461', pincode: '60010', officeName: 'Galay Wala', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '462', pincode: '43370', officeName: 'Ganda Kas', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '463', pincode: '55100', officeName: 'Ganda Singh Wala', city: 'Kasur', district: 'Kasur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '464', pincode: '37280', officeName: 'Ganga Pur', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '465', pincode: '37110', officeName: 'Garh', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '466', pincode: '35080', officeName: 'Garh Maha Raja', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '467', pincode: '49360', officeName: 'Garh Mahal', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '468', pincode: '61150', officeName: 'Garha More', city: 'Vehari', district: 'Vehari', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '469', pincode: '05226', officeName: 'Garjakh PO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '470', pincode: '34060', officeName: 'Gas Tarbine POwer Muzaffargarh', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '471', pincode: '48220', officeName: 'Gatal', city: 'Talagang', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '472', pincode: '04603', officeName: 'Gawal Mandi, Rawalpindi PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '473', pincode: '52200', officeName: 'Ghakhar', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '474', pincode: '47184', officeName: 'Ghariai', city: 'Murree', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '475', pincode: '04604', officeName: 'Gharib Abad PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '476', pincode: '49090', officeName: 'Gharibwal Cement', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '477', pincode: '51090', officeName: 'Ghartal', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '478', pincode: '48808', officeName: 'Ghazi Abad', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '479', pincode: '57210', officeName: 'Ghazi Abad', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '480', pincode: '04883', officeName: 'Ghaziabad PO', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '481', pincode: '48914', officeName: 'Ghazial', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '482', pincode: '47110', officeName: 'Ghora Gali', city: 'Murree', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '483', pincode: '38900', officeName: 'Ghulam Muhammad Abad', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '484', pincode: '03891', officeName: 'Ghulam Muhammad Abad NPO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '485', pincode: '42302', officeName: 'Ghundi', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '486', pincode: '51040', officeName: 'Ghunike', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '487', pincode: '36270', officeName: 'Gil Acri', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '488', pincode: '41020', officeName: 'Girote', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '489', pincode: '56200', officeName: 'Gogera', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '490', pincode: '51360', officeName: 'Gohadapur', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '491', pincode: '50500', officeName: 'Gojra', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '492', pincode: '36120', officeName: 'Gojra', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '493', pincode: '03612', officeName: 'Gojra City PO', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '494', pincode: '03611', officeName: 'Gojra GPO NPO', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '495', pincode: '36282', officeName: 'Gojra More', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '496', pincode: '51370', officeName: 'Gondal', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '497', pincode: '40216', officeName: 'Gondal (Sargodha)', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '498', pincode: '52310', officeName: 'Gondalan Wala', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '499', pincode: '05403', officeName: 'Gor Estate PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '500', pincode: '50182', officeName: 'Gotriala', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '501', pincode: '03223', officeName: 'Grain Market PO', city: 'Dera Ghazi Khan', district: 'Dera Ghazi Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '502', pincode: '04013', officeName: 'Grain Market SO', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '503', pincode: '47850', officeName: 'Gujar Khan GPO', city: 'Gujar Khan', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '504', pincode: '04781', officeName: 'Gujar Khan NPO', city: 'Gujar Khan', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '505', pincode: '52300', officeName: 'Gujranwala Anwar Industries', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '506', pincode: '52230', officeName: 'Gujranwala Cantt', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '507', pincode: '52290', officeName: 'Gujranwala Climax Abad', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '508', pincode: '52250', officeName: 'Gujranwala GPO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '509', pincode: '05221', officeName: 'Gujranwala GPO NPO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '510', pincode: '05229', officeName: 'Gujranwala Kutchery PO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '511', pincode: '52260', officeName: 'Gujranwala Peoples Colony', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '512', pincode: '52256', officeName: 'Gujranwala Secondary Board', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '513', pincode: '34120', officeName: 'Gujrat (Muzaffargarh)', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '514', pincode: '05073', officeName: 'Gujrat City NPO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '515', pincode: '05072', officeName: 'Gujrat City TSO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '516', pincode: '50700', officeName: 'Gujrat GPO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '517', pincode: '05071', officeName: 'Gujrat GPO NPO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '518', pincode: '05074', officeName: 'Gujrat R.S. PO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '519', pincode: '05307', officeName: 'Gulab Devi Hospital PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '520', pincode: '05457', officeName: 'Gulberg Colony NPO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '521', pincode: '05458', officeName: 'Gulberg N. PO (Cpol-1318)', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '522', pincode: '05459', officeName: 'Gulberg PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '523', pincode: '47220', officeName: 'Gulehra Gali', city: 'Murree', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '524', pincode: '03809', officeName: 'Gulfishan Colony SO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '525', pincode: '60700', officeName: 'Gulgasht Colony', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '526', pincode: '50160', officeName: 'Guliana', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '527', pincode: '38610', officeName: 'Gulistan Colony, Faisalabad', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '528', pincode: '47880', officeName: 'Gulyana', city: 'Gujar Khan', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '529', pincode: '05479', officeName: 'Gunj Moghal Pura PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '530', pincode: '43410', officeName: 'Gurgushti', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '531', pincode: '41210', officeName: 'Hadali', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '532', pincode: '43040', officeName: 'Hadowali', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '533', pincode: '52110', officeName: 'Hafiz Abad', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '534', pincode: '30030', officeName: 'Haiderabad (Bhakkar)', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '535', pincode: '50890', officeName: 'Hajiwala', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '536', pincode: '43470', officeName: 'Hameed', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '537', pincode: '47340', officeName: 'Hanesar', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '538', pincode: '58110', officeName: 'Hanuman Garh', city: 'Khanewal', district: 'Khanewal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '539', pincode: '47652', officeName: 'Haraka', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '540', pincode: '49050', officeName: 'Haran Pur', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '541', pincode: '57170', officeName: 'Harappa City', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '542', pincode: '57160', officeName: 'Harappa Railway Station', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '543', pincode: '42020', officeName: 'Harnoli', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '544', pincode: '62100', officeName: 'Haroon Abad', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '545', pincode: '43730', officeName: 'Hasan Abdal', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '546', pincode: '48740', officeName: 'Hasil', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '547', pincode: '63000', officeName: 'Hasil Pur Mandi', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '548', pincode: '50290', officeName: 'Haslanwala', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '549', pincode: '63320', officeName: 'Hatheji', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '550', pincode: '43394', officeName: 'Hattar', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '551', pincode: '43580', officeName: 'Hattian', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '552', pincode: '35150', officeName: 'Haveli Bahadur Shah', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '553', pincode: '56020', officeName: 'Haveli Lakkha', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '554', pincode: '04782', officeName: 'Hayat Sir Road PO', city: 'Gujar Khan', district: 'Gujar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '555', pincode: '40542', officeName: 'Hazoorpur', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '556', pincode: '43440', officeName: 'Hazro', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '557', pincode: '63236', officeName: 'Head Rajkan', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '558', pincode: '47050', officeName: 'Heavy Mechanical Complex Taxila', city: 'Wah Cantt', district: 'Wah Cantt', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '559', pincode: '50440', officeName: 'Helan', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '560', pincode: '05404', officeName: 'High Court PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '561', pincode: '40560', officeName: 'Hujjan', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '562', pincode: '56170', officeName: 'Hujra', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '563', pincode: '41010', officeName: 'Hussain Abad', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '564', pincode: '03810', officeName: 'Hussaind Pura SO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '565', pincode: '40340', officeName: 'Hyderabad Town Sargodha', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '566', pincode: '64080', officeName: 'Hysons Sugar Mills Jetha Bhutta', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '567', pincode: '05308', officeName: 'Ichhra PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '568', pincode: '43240', officeName: 'Ikhlas', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '569', pincode: '51830', officeName: 'Ikhlaspur', city: 'Narowal', district: 'Narowal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '570', pincode: '63090', officeName: 'Inaiti', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '571', pincode: '60900', officeName: 'Industrial Estate', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '572', pincode: '43020', officeName: 'Injra', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '573', pincode: '04014', officeName: 'Iqbal Colony SO', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '574', pincode: '57350', officeName: 'Iqbal Nagar', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '575', pincode: '64310', officeName: 'Iqbalabad', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '576', pincode: '03812', officeName: 'Iron Market SO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '577', pincode: '42430', officeName: 'Isa Khel', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '578', pincode: '42340', officeName: 'Iskandar Abad', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '579', pincode: '03811', officeName: 'Islamia College SO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '580', pincode: '06314', officeName: 'Islamia University TSO', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '581', pincode: '05405', officeName: 'Islampura PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '582', pincode: '04015', officeName: 'Islampura SO', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '583', pincode: '59200', officeName: 'Ismailabad', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '584', pincode: '04016', officeName: 'Istaqlalabad SO', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '585', pincode: '48556', officeName: 'Istqlal Camp', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '586', pincode: '41124', officeName: 'Jabba', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '587', pincode: '47660', officeName: 'Jabbar Darvesh', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '588', pincode: '41220', officeName: 'Jabbi', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '589', pincode: '48020', officeName: 'Jabbi Shah Dilawar', city: 'Talagang', district: 'Talagang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '590', pincode: '56290', officeName: 'Jaboka', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '591', pincode: '05646', officeName: 'Jaboka PO', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '592', pincode: '04963', officeName: 'Jada SO', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '593', pincode: '40614', officeName: 'Jahanabad', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '594', pincode: '05452', officeName: 'Jahangir Town PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '595', pincode: '58200', officeName: 'Jahania', city: 'Khanewal', district: 'Khanewal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '596', pincode: '41170', officeName: 'Jahlar', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '597', pincode: '36390', officeName: 'Jakhar', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '598', pincode: '50780', officeName: 'Jalal Pur Jattan', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '599', pincode: '49120', officeName: 'Jalal Pur Sharif', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '600', pincode: '43400', officeName: 'Jalalia', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '601', pincode: '52170', officeName: 'Jalalpur Nau', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '602', pincode: '59250', officeName: 'Jalalpur Pirwala', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '603', pincode: '32420', officeName: 'Jalbani', city: 'Dera Ghazi Khan', district: 'Dera Ghazi Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '604', pincode: '52302', officeName: 'Jalil Town', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '605', pincode: '61230', officeName: 'Jalla Jim', city: 'Vehari', district: 'Vehari', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '606', pincode: '53500', officeName: 'Jallo', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '607', pincode: '43112', officeName: 'Jalwal', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '608', pincode: '33000', officeName: 'Jam Pur', city: 'Dera Ghazi Khan', district: 'Dera Ghazi Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '609', pincode: '64370', officeName: 'Jamal Din Wali', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '610', pincode: '41280', officeName: 'Jamali', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '611', pincode: '63050', officeName: 'Jamalpur', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '612', pincode: '63050', officeName: 'Jamalpur Edso', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '613', pincode: '49750', officeName: 'Jamarghal', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '614', pincode: '55250', officeName: 'Jamber Kalan', city: 'Kasur', district: 'Kasur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '615', pincode: '35360', officeName: 'Jamia Ashrafia', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '616', pincode: '05230', officeName: 'Jamia Ashrafia PO', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '617', pincode: '51020', officeName: 'Jamki', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '618', pincode: '49480', officeName: 'Jammu Kashmir Muhajir Colony', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '619', pincode: '03301', officeName: 'Jampur NPO', city: 'Dera Ghazi Khan', district: 'Dera Ghazi Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '620', pincode: '43100', officeName: 'Jand', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '621', pincode: '48940', officeName: 'Jand (Chakwal)', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '622', pincode: '47970', officeName: 'Jand Mehloo', city: 'Gujar Khan', district: 'Gujar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '623', pincode: '49340', officeName: 'Jandala', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '624', pincode: '30150', officeName: 'Jandan Wala', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '625', pincode: '65280', officeName: 'Jandraka', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '626', pincode: '48812', officeName: 'Janga', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '627', pincode: '36100', officeName: 'Jani Wala', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '628', pincode: '37250', officeName: 'Jaranwala', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '629', pincode: '03721', officeName: 'Jaranwala NPO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '630', pincode: '47990', officeName: 'Jarmot Kalan', city: 'Gujar Khan', district: 'Gujar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '631', pincode: '48072', officeName: 'Jasial', city: 'Talagang', district: 'Talagang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '632', pincode: '51750', officeName: 'Jassar', city: 'Narowal', district: 'Narowal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '633', pincode: '51100', officeName: 'Jatheki', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '634', pincode: '47780', officeName: 'Jatli', city: 'Gujar Khan', district: 'Gujar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '635', pincode: '34430', officeName: 'Jatoi', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '636', pincode: '41200', officeName: 'Jauhar Abad', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '637', pincode: '04121', officeName: 'Jauharabad NPO', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '638', pincode: '41282', officeName: 'Jaura Kalan', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '639', pincode: '50250', officeName: 'Jaurah', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '640', pincode: '59050', officeName: 'Javed Nagar', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '641', pincode: '47420', officeName: 'Jewra', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '642', pincode: '52120', officeName: 'Jhallan', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '643', pincode: '43070', officeName: 'Jhamat', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '644', pincode: '48550', officeName: 'Jhamrah', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '645', pincode: '04628', officeName: 'Jhanda Chichi PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '646', pincode: '35200', officeName: 'Jhang GPO', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '647', pincode: '40260', officeName: 'Chak 111 Sb', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '648', pincode: '37570', officeName: 'Chak 113 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '649', pincode: '37600', officeName: 'Chak 117 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '650', pincode: '63230', officeName: 'Chak 117/D.B', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '651', pincode: '62004', officeName: 'Chak 117/M', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '652', pincode: '57340', officeName: 'Chak 119/13-Al', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '653', pincode: '57330', officeName: 'Chak 120/13-Al', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '654', pincode: '57130', officeName: 'Chak 120/9-L', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '655', pincode: '37220', officeName: 'Chak 128 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '656', pincode: '62070', officeName: 'Chak 132/6-R', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '657', pincode: '58220', officeName: 'Chak 136/10-R', city: 'Khanewal', district: 'Khanewal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '658', pincode: '58202', officeName: 'Chak 138/10 R', city: 'Khanewal', district: 'Khanewal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '659', pincode: '57180', officeName: 'Chak 145/9-L', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '660', pincode: '36150', officeName: 'Chak 159 GB', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '661', pincode: '37740', officeName: 'Chak 16 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '662', pincode: '57230', officeName: 'Chak 168/9-L', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '663', pincode: '35310', officeName: 'Chak 175 /Jb', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '664', pincode: '37690', officeName: 'Chak 189 RB (Rasulpur)', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '665', pincode: '37620', officeName: 'Chak 199 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '666', pincode: '37610', officeName: 'Chak 203 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '667', pincode: '37040', officeName: 'Chak 206 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '668', pincode: '37050', officeName: 'Chak 207 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '669', pincode: '62030', officeName: 'Chak 227/R-9', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '670', pincode: '38220', officeName: 'Chak 229 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '671', pincode: '37420', officeName: 'Chak 248 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '672', pincode: '37400', officeName: 'Chak 253 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '673', pincode: '36080', officeName: 'Chak 256 GB', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '674', pincode: '37410', officeName: 'Chak 257 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '675', pincode: '37360', officeName: 'Chak 267 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '676', pincode: '38230', officeName: 'Chak 271 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '677', pincode: '37530', officeName: 'Chak 275 J.B', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '678', pincode: '40310', officeName: 'Chak 29 S.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '679', pincode: '62024', officeName: 'Chak 297/HR', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '680', pincode: '36000', officeName: 'Chak 316 GB Qadir Abad', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '681', pincode: '35012', officeName: 'Chak 327 GB', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '682', pincode: '36330', officeName: 'Chak 333 GB', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '683', pincode: '40330', officeName: 'Chak 34 N.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '684', pincode: '37224', officeName: 'Chak 353 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '685', pincode: '40060', officeName: 'Chak 36 S.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '686', pincode: '36260', officeName: 'Chak 387 GB', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '687', pincode: '42060', officeName: 'Chak 4/Db', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '688', pincode: '36160', officeName: 'Chak 424/Jb', city: 'Toba Tek Singh', district: 'Toba Tek Singh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '689', pincode: '37180', officeName: 'Chak 433 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '690', pincode: '37130', officeName: 'Chak 447 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '691', pincode: '37340', officeName: 'Chak 45 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '692', pincode: '40050', officeName: 'Chak 46 S.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '693', pincode: '30050', officeName: 'Chak 47/T.D.A.', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '694', pincode: '37060', officeName: 'Chak 482 GB (Jagranwan)', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '695', pincode: '35110', officeName: 'Chak 490', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '696', pincode: '56316', officeName: 'Chak 53/2-L', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '697', pincode: '38240', officeName: 'Chak 583 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '698', pincode: '38210', officeName: 'Chak 59 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '699', pincode: '40140', officeName: 'Chak 64 S.B', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '700', pincode: '37230', officeName: 'Chak 66 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '701', pincode: '37540', officeName: 'Chak 67 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '702', pincode: '30052', officeName: 'Chak 67 Ml', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '703', pincode: '62080', officeName: 'Chak 69/4-R', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '704', pincode: '57070', officeName: 'Chak 85/6 R (Kot Khadim Ali Shah)', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '705', pincode: '40300', officeName: 'Chak 86 S.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '706', pincode: '40270', officeName: 'Chak 88 S.B.', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '707', pincode: '57030', officeName: 'Chak 90/9-L', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '708', pincode: '31000', officeName: 'Chak 90/Ml', city: 'Layyah', district: 'Layyah', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '709', pincode: '57100', officeName: 'Chak 91/6-R', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '710', pincode: '37290', officeName: 'Chak 98/Gb', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '711', pincode: '49460', officeName: 'Chak Akka', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '712', pincode: '48860', officeName: 'Chak Baqar Shah', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '713', pincode: '57440', officeName: 'Chak Bedi', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '714', pincode: '47600', officeName: 'Chak Beli Khan', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '715', pincode: '48694', officeName: 'Chak Bhaun', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '716', pincode: '49520', officeName: 'Chak Daulat', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '717', pincode: '49102', officeName: 'Chak Jani', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '718', pincode: '50310', officeName: 'Chak Jano Khurd', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '719', pincode: '37700', officeName: 'Chak Jhumra', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '720', pincode: '50840', officeName: 'Chak Kamala', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '721', pincode: '48770', officeName: 'Chak Malook', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '722', pincode: '40520', officeName: 'Chak Mubarak', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '723', pincode: '50120', officeName: 'Chak Muhammad', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '724', pincode: '50350', officeName: 'Chak No. 1', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '725', pincode: '31250', officeName: 'Chak No.270 Tda', city: 'Layyah', district: 'Layyah', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '726', pincode: '31400', officeName: 'Chak No.279 Tda', city: 'Layyah', district: 'Layyah', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '727', pincode: '56330', officeName: 'Chak No.36/2L', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '728', pincode: '56320', officeName: 'Chak No.49/3R', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '729', pincode: '57430', officeName: 'Chak No.73/5-L (Moghal)', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '730', pincode: '40520', officeName: 'Chak Ram Das', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '731', pincode: '57150', officeName: 'Chak Shafi', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '732', pincode: '30004', officeName: 'Chak-186', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '733', pincode: '60030', officeName: 'Chak-379/Wb', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '734', pincode: '57174', officeName: 'Chak-5/11L', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '735', pincode: '04626', officeName: 'Chaklala Cantt PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '736', pincode: '04625', officeName: 'Chaklala Scheme-Iii PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '737', pincode: '46202', officeName: 'Chaklala Village', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '738', pincode: '48930', officeName: 'Chakora', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '739', pincode: '48840', officeName: 'Chakral', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '740', pincode: '42230', officeName: 'Chakrala', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '741', pincode: '04882', officeName: 'Chakwal City PO', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '742', pincode: '48800', officeName: 'Chakwal GPO', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '743', pincode: '04881', officeName: 'Chakwal NPO', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' }
];

export const postalService = {
  getAll: (): PostalRecord[] => {
    return postalData;
  },

  getDistricts: (province?: string): string[] => {
    let data = postalData;
    if (province) {
      data = data.filter(item => item.province === province);
    }
    const districts = new Set(data.map(item => item.district));
    return Array.from(districts).sort();
  },

  search: async (query: string, type: SearchType, filters: SearchFilters): Promise<PostalRecord[]> => {
    // If Supabase is configured, try fetching from there first
    if (supabase) {
        try {
            let dbQuery = supabase.from('postal_records').select('*');

            if (filters.province) dbQuery = dbQuery.eq('province', filters.province);
            if (filters.district) dbQuery = dbQuery.eq('district', filters.district);
            if (filters.status) dbQuery = dbQuery.eq('deliveryStatus', filters.status);

            if (query) {
                const lowerQuery = query.toLowerCase();
                switch (type) {
                    case SearchType.PINCODE:
                        dbQuery = dbQuery.ilike('pincode', `%${query}%`);
                        break;
                    case SearchType.CITY:
                        dbQuery = dbQuery.ilike('city', `%${query}%`);
                        break;
                    case SearchType.STATE:
                        dbQuery = dbQuery.ilike('province', `%${query}%`);
                        break;
                    case SearchType.OFFICE:
                        dbQuery = dbQuery.ilike('officeName', `%${query}%`);
                        break;
                    default:
                         // basic robust search across fields
                        dbQuery = dbQuery.or(`pincode.ilike.%${query}%,officeName.ilike.%${query}%,city.ilike.%${query}%`);
                }
            }

            const { data, error } = await dbQuery.limit(50);
            
            if (!error && data && data.length > 0) {
                return data as PostalRecord[];
            }
        } catch (e) {
            console.warn("Supabase search failed or not configured, falling back to local data.", e);
        }
    }

    // Fallback to local data
    let results = postalData;

    // Apply filters
    if (filters.province) {
      results = results.filter(item => item.province === filters.province);
    }
    if (filters.district) {
      results = results.filter(item => item.district === filters.district);
    }
    if (filters.status) {
      results = results.filter(item => item.deliveryStatus === filters.status);
    }

    // Apply query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(item => {
        switch (type) {
            case SearchType.PINCODE:
                return item.pincode.includes(query);
            case SearchType.CITY:
                return item.city.toLowerCase().includes(lowerQuery);
            case SearchType.STATE:
                return item.province.toLowerCase().includes(lowerQuery);
            case SearchType.OFFICE:
                return item.officeName.toLowerCase().includes(lowerQuery);
            default:
                 return item.pincode.includes(query) || 
                        item.officeName.toLowerCase().includes(lowerQuery) ||
                        item.city.toLowerCase().includes(lowerQuery);
        }
      });
    }

    return results;
  },

  getStats: (): DashboardStats => {
    const stats: DashboardStats = {
      totalPincodes: new Set(postalData.map(p => p.pincode)).size,
      totalCities: new Set(postalData.map(p => p.city)).size,
      totalOffices: postalData.length,
      totalProvinces: new Set(postalData.map(p => p.province)).size,
      totalDistricts: new Set(postalData.map(p => p.district)).size,
      officesByType: {}
    };

    postalData.forEach(item => {
        const type = item.officeType || 'Unknown';
        stats.officesByType[type] = (stats.officesByType[type] || 0) + 1;
    });

    return stats;
  },

  getById: (id: string): PostalRecord | undefined => {
    return postalData.find(item => item.id === id);
  },

  updateRecord: (updatedRecord: PostalRecord): void => {
    postalData = postalData.map(item => item.id === updatedRecord.id ? updatedRecord : item);
  },

  deleteRecord: (id: string): void => {
    postalData = postalData.filter(item => item.id !== id);
  },

  addRecord: (record: Omit<PostalRecord, 'id'>): PostalRecord => {
      const newRecord = { ...record, id: generateId() };
      postalData.push(newRecord);
      return newRecord;
  }
};