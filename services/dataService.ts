import { PostalRecord, DashboardStats } from '../types';

// Initial Mock Data for Pakistan
const INITIAL_DATA: PostalRecord[] = [
  { id: '1', pincode: '44000', officeName: 'Islamabad GPO', city: 'Islamabad', district: 'Islamabad', province: 'Federal Capital', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '2', pincode: '54000', officeName: 'Lahore GPO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '3', pincode: '74000', officeName: 'Karachi GPO', city: 'Karachi', district: 'Karachi', province: 'Sindh', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '4', pincode: '25000', officeName: 'Peshawar GPO', city: 'Peshawar', district: 'Peshawar', province: 'Khyber Pakhtunkhwa', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '5', pincode: '87300', officeName: 'Quetta GPO', city: 'Quetta', district: 'Quetta', province: 'Balochistan', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '6', pincode: '54810', officeName: 'Model Town', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '7', pincode: '75500', officeName: 'Clifton', city: 'Karachi', district: 'Karachi South', province: 'Sindh', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '8', pincode: '46000', officeName: 'Rawalpindi GPO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '9', pincode: '60000', officeName: 'Multan GPO', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '10', pincode: '38000', officeName: 'Faisalabad GPO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '11', pincode: '51310', officeName: 'Sialkot GPO', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '12', pincode: '22010', officeName: 'Abbottabad GPO', city: 'Abbottabad', district: 'Abbottabad', province: 'Khyber Pakhtunkhwa', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '13', pincode: '15100', officeName: 'Mingora', city: 'Swat', district: 'Swat', province: 'Khyber Pakhtunkhwa', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '14', pincode: '63100', officeName: 'Bahawalpur GPO', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '15', pincode: '71000', officeName: 'Hyderabad GPO', city: 'Hyderabad', district: 'Hyderabad', province: 'Sindh', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '16', pincode: '58000', officeName: 'Chakwal GPO', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '17', pincode: '50700', officeName: 'Gujrat GPO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '18', pincode: '43600', officeName: 'Attock GPO', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '19', pincode: '49000', officeName: 'Mianwali GPO', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '20', pincode: '89100', officeName: 'Gwadar GPO', city: 'Gwadar', district: 'Gwadar', province: 'Balochistan', deliveryStatus: 'Non-Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '21', pincode: '13100', officeName: 'Muzaffarabad GPO', city: 'Muzaffarabad', district: 'Muzaffarabad', province: 'Azad Kashmir', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '22', pincode: '14100', officeName: 'Mirpur', city: 'Mirpur', district: 'Mirpur', province: 'Azad Kashmir', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '23', pincode: '38850', officeName: 'Madina Town', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '24', pincode: '38090', officeName: 'Peoples Colony', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '25', pincode: '38040', officeName: 'Nishatabad', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '26', pincode: '37250', officeName: 'Jaranwala GPO', city: 'Jaranwala', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '27', pincode: '37300', officeName: 'Samundri GPO', city: 'Samundri', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '28', pincode: '38060', officeName: 'Gulistan Colony', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '29', pincode: '38030', officeName: 'Sargodha Road', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '30', pincode: '38070', officeName: 'Ghulam Muhammad Abad', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '31', pincode: '38700', officeName: 'Noor Pur', city: 'Faisalabad Noor Pur', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '32', pincode: '03802', officeName: 'Agriculture University Faisalabad', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '33', pincode: '03803', officeName: 'Ayub Agri Reasearch Institute PO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '34', pincode: '38850', officeName: 'Ayub Agricultural Research Institute', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '35', pincode: '03823', officeName: 'Batala Colony SO', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '36', pincode: '37260', officeName: 'Buchiana', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '37', pincode: '37730', officeName: 'Burj Mandi', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '38', pincode: '37720', officeName: 'Chak 103 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '39', pincode: '37660', officeName: 'Chak 103 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '40', pincode: '37570', officeName: 'Chak 113 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '41', pincode: '37600', officeName: 'Chak 117 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '42', pincode: '37220', officeName: 'Chak 128 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '43', pincode: '37740', officeName: 'Chak 16 JB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '44', pincode: '37690', officeName: 'Chak 189 RB (Rasulpur)', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '45', pincode: '37620', officeName: 'Chak 199 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '46', pincode: '37610', officeName: 'Chak 203 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '47', pincode: '37040', officeName: 'Chak 206 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '48', pincode: '37050', officeName: 'Chak 207 GB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '49', pincode: '38220', officeName: 'Chak 229 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '50', pincode: '37420', officeName: 'Chak 248 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '51', pincode: '37400', officeName: 'Chak 253 RB', city: 'Faisalabad', district: 'Faisalabad', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '52', pincode: '05075', officeName: 'A.B.S.Hospital TSO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '53', pincode: '05425', officeName: 'AJ Town NPO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '54', pincode: '05132', officeName: 'Abbot Road TSO', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '55', pincode: '58180', officeName: 'Abdul Hakim', city: 'Khanewal', district: 'Khanewal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '56', pincode: '05133', officeName: 'Abid Shaheed Rd. TSO', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '57', pincode: '05463', officeName: 'Adda Chabeel PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '58', pincode: '57460', officeName: 'Adda Gambeer', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '59', pincode: '41260', officeName: 'Adhi Kot', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '60', pincode: '39060', officeName: 'Adhian', city: 'Sheikhupura', district: 'Sheikhupura', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '61', pincode: '50730', officeName: 'Adowal', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '62', pincode: '49304', officeName: 'Adrana', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '63', pincode: '05467', officeName: 'Agriculture House PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '64', pincode: '35090', officeName: 'Ahamed Pur Sial', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '65', pincode: '47066', officeName: 'Ahata Farooqia', city: 'Wah Cantt', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '66', pincode: '47750', officeName: 'Ahdi', city: 'Gujar Khan', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '67', pincode: '52070', officeName: 'Ahmad Nagar', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '68', pincode: '63350', officeName: 'Ahmad Pur East', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '69', pincode: '64380', officeName: 'Ahmadpur Lama', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '70', pincode: '40120', officeName: 'Ahmed Pur', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '71', pincode: '34000', officeName: 'Ahsan Pur', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '72', pincode: '04627', officeName: 'Air Port Chaklala', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '73', pincode: '39450', officeName: 'Ajnian Wala', city: 'Sheikhupura', district: 'Sheikhupura', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '74', pincode: '56100', officeName: 'Akhtar Abad', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '75', pincode: '48060', officeName: 'Akwal', city: 'Talagang', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '76', pincode: '57470', officeName: 'Al-Jamia', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '77', pincode: '40418', officeName: 'Alamabad', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '78', pincode: '03001', officeName: 'Alamabad PO', city: 'Bhakkar', district: 'Bhakkar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '79', pincode: '34450', officeName: 'Ali Pur', city: 'Muzaffargarh', district: 'Muzaffargarh', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '80', pincode: '52080', officeName: 'Ali Pur Chatha', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '81', pincode: '35210', officeName: 'Aliabad', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '82', pincode: '50766', officeName: 'Alipur', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '83', pincode: '40500', officeName: 'Alipur Noon', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '84', pincode: '40544', officeName: 'Alipur Saidan', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '85', pincode: '64020', officeName: 'Allah Abad', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '86', pincode: '05468', officeName: 'Allama Iqbal Road PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '87', pincode: '49610', officeName: 'Alliance Textile Mills', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '88', pincode: '42010', officeName: 'Alluwali', city: 'Mianwali', district: 'Mianwali', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '89', pincode: '43734', officeName: 'Airo Lab', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '90', pincode: '04617', officeName: 'Amar Pura PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '91', pincode: '05449', officeName: 'Amer Sidhu PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '92', pincode: '05076', officeName: 'Amina Abad TSO', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '93', pincode: '50340', officeName: 'Amra Kalan', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '94', pincode: '41140', officeName: 'Angah', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '95', pincode: '56150', officeName: 'Anwar Shaeed Colony Renala Khurd', city: 'Okara', district: 'Okara', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '96', pincode: '48326', officeName: 'Ara', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '97', pincode: '57450', officeName: 'Arif Wala', city: 'Sahiwal', district: 'Sahiwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '98', pincode: '52400', officeName: 'Aroop', city: 'Gujranwala', district: 'Gujranwala', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '99', pincode: '48370', officeName: 'Arrar', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '100', pincode: '63274', officeName: 'Ashraf Sugar Mills Bahawalpur', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '101', pincode: '46604', officeName: 'Askari 14', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '102', pincode: '40184', officeName: 'Astana-E-Fazal', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '103', pincode: '35180', officeName: 'Atharan Hazari', city: 'Jhang', district: 'Jhang', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '104', pincode: '40412', officeName: 'Attabad', city: 'Sargodha', district: 'Sargodha', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '105', pincode: '04363', officeName: 'Attock Cantt PO', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '106', pincode: '04362', officeName: 'Attock City PO', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '107', pincode: '43560', officeName: 'Attock Khurd', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '108', pincode: '04361', officeName: 'Attock NPO', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '109', pincode: '50010', officeName: 'Aurangabad', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '110', pincode: '50870', officeName: 'Awan Sharif', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '111', pincode: '05430', officeName: 'Azam PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '112', pincode: '50330', officeName: 'B. G. Pur', city: 'Mandi Bahauddin', district: 'Mandi Bahauddin', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '113', pincode: '05412', officeName: 'Badami Bagh PO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '114', pincode: '51410', officeName: 'Badiana', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '115', pincode: '51700', officeName: 'Badomali', city: 'Narowal', district: 'Narowal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '116', pincode: '48760', officeName: 'Badshahan', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '117', pincode: '47390', officeName: 'Bagh Jamiri', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '118', pincode: '05460', officeName: 'Baghbanpura NPO', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '119', pincode: '64160', officeName: 'Bagho Bahr', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '120', pincode: '59300', officeName: 'Bahadar Pur', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '121', pincode: '39530', officeName: 'Bahalike', city: 'Sheikhupura', district: 'Sheikhupura', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '122', pincode: '60800', officeName: 'Bahauddin Zakaria University', city: 'Multan', district: 'Multan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '123', pincode: '06232', officeName: 'Bahawal Nagar Cantt PO', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '124', pincode: '06233', officeName: 'Bahawal Nagar City PO', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '125', pincode: '62300', officeName: 'Bahawal Nagar GPO', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office' },
  { id: '126', pincode: '06231', officeName: 'Bahawal Nagar NPO', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '127', pincode: '63080', officeName: 'Bahawalpur Cantt', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '128', pincode: '63170', officeName: 'Bahawalpur Intermediate Secondary Board', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '129', pincode: '06311', officeName: 'Bahawalpur NPO', city: 'Bahawalpur', district: 'Bahawalpur', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '130', pincode: '43740', officeName: 'Bahtar', city: 'Attock', district: 'Attock', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '131', pincode: '50030', officeName: 'Baisa Kalan', city: 'Gujrat', district: 'Gujrat', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '132', pincode: '51402', officeName: 'Bajra Garhi', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '133', pincode: '62400', officeName: 'Bakhshan Khan', city: 'Bahawal Nagar', district: 'Bahawalnagar', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '134', pincode: '04618', officeName: 'Bakra Mandi PO', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '135', pincode: '49260', officeName: 'Bakrala', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '136', pincode: '48630', officeName: 'Balkasar', city: 'Chakwal', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '137', pincode: '55210', officeName: 'Balloki', city: 'Lahore', district: 'Lahore', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '138', pincode: '48130', officeName: 'Balwai', city: 'Talagang', district: 'Chakwal', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '139', pincode: '47230', officeName: 'Ban', city: 'Murree', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '140', pincode: '51490', officeName: 'Ban Gajwa', city: 'Sialkot', district: 'Sialkot', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '141', pincode: '47560', officeName: 'Banda', city: 'Rawalpindi', district: 'Rawalpindi', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '142', pincode: '41310', officeName: 'Bandiai', city: 'Khushab', district: 'Khushab', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '143', pincode: '49330', officeName: 'Banglai', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '144', pincode: '64410', officeName: 'Bangla Manthar', city: 'Rahimyar Khan', district: 'Rahimyar Khan', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '145', pincode: '49350', officeName: 'Bara Gran', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' },
  { id: '146', pincode: '49320', officeName: 'Baragowah', city: 'Jhelum', district: 'Jhelum', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'Sub Post Office' }
];

export class PostalService {
  private data: PostalRecord[];

  constructor() {
    // In a real app, this might load from LocalStorage or an API
    const stored = localStorage.getItem('postalData');
    this.data = stored ? JSON.parse(stored) : INITIAL_DATA;
  }

  getAll(): PostalRecord[] {
    return this.data;
  }

  getById(id: string): PostalRecord | undefined {
    return this.data.find(r => r.id === id);
  }

  addRecord(record: Omit<PostalRecord, 'id'>): PostalRecord {
    const newRecord = { ...record, id: Date.now().toString() };
    this.data = [newRecord, ...this.data];
    this.save();
    return newRecord;
  }

  updateRecord(updatedRecord: PostalRecord): void {
    this.data = this.data.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    this.save();
  }

  deleteRecord(id: string): void {
    this.data = this.data.filter(r => r.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem('postalData', JSON.stringify(this.data));
  }

  search(query: string, type: 'Pincode' | 'City' | 'Post Office' | 'State'): PostalRecord[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.data;

    return this.data.filter(item => {
      switch (type) {
        case 'Pincode': return item.pincode.includes(q);
        case 'City': return item.city.toLowerCase().includes(q);
        case 'Post Office': return item.officeName.toLowerCase().includes(q);
        case 'State': return item.province.toLowerCase().includes(q);
        default: return false;
      }
    });
  }

  getDistricts(provinceFilter?: string): string[] {
    let filteredData = this.data;
    if (provinceFilter) {
        filteredData = filteredData.filter(d => d.province === provinceFilter);
    }
    return Array.from(new Set(filteredData.map(d => d.district))).sort();
  }

  getStats(): DashboardStats {
    const totalPincodes = new Set(this.data.map(d => d.pincode)).size;
    const totalCities = new Set(this.data.map(d => d.city)).size;
    const totalOffices = this.data.length;
    const totalProvinces = new Set(this.data.map(d => d.province)).size;
    
    // New calculations - Filter ensures we don't count undefined/empty districts
    const totalDistricts = new Set(this.data.filter(d => d.district).map(d => d.district)).size;
    
    const officesByType: Record<string, number> = {};
    this.data.forEach(d => {
        // Use existing type or default
        const type = d.officeType || 'Sub Post Office';
        officesByType[type] = (officesByType[type] || 0) + 1;
    });

    return { 
        totalPincodes, 
        totalCities, 
        totalOffices, 
        totalProvinces, 
        totalDistricts, 
        officesByType 
    };
  }
}

export const postalService = new PostalService();