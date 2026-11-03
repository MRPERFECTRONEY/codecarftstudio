const API_BASE = '/api';
const tokenKey = 'ccs_admin_token';
const authHeaders = () => {
  const token = localStorage.getItem(tokenKey);
  return token ? { Authorization: 'Bearer ' + token } : {};
};
async function request(path, options = {}) {
  const response = await fetch(API_BASE + path, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type':'application/json' } : {}), ...authHeaders(), ...(options.headers || {}) }
  });
  const data = await response.json().catch(()=>({success:false,error:'Invalid server response.'}));
  if (response.status === 401 && path !== '/admin/login') localStorage.removeItem(tokenKey);
  if (!response.ok && !data.error) data.error = 'Request failed ('+response.status+').';
  return data;
}
export async function adminLogin(email,password) {
  const result = await request('/admin/login',{method:'POST',body:JSON.stringify({email,password})});
  if(result.success && result.token) localStorage.setItem(tokenKey,result.token);
  return result;
}
export function adminLogout(){localStorage.removeItem(tokenKey);}
export function hasAdminSession(){return Boolean(localStorage.getItem(tokenKey));}
export const fetchHealth = () => request('/health');
export const fetchStats = () => request('/stats');
export const fetchPortfolio = () => request('/portfolio');
export const addPortfolioItem = data => request('/portfolio',{method:'POST',body:JSON.stringify(data)});
export const submitInquiry = data => request('/inquiries',{method:'POST',body:JSON.stringify(data)});
export const fetchInquiries = () => request('/inquiries');
export const updateInquiryStatus = (id,status) => request('/inquiries/'+encodeURIComponent(id)+'/status',{method:'PUT',body:JSON.stringify({status})});
export const trackProject = code => request('/projects/track/'+encodeURIComponent(code));
export const fetchProjects = () => request('/projects');
export const updateProject = (id,data) => request('/projects/'+encodeURIComponent(id),{method:'PUT',body:JSON.stringify(data)});
export const calculateEstimate = data => request('/estimator/calculate',{method:'POST',body:JSON.stringify(data)});
