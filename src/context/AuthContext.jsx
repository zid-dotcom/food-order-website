import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const initialUser = {
  name: "Arjun Nair",
  email: "arjun.nair@example.com",
  phone: "+91 98950 12345",
  isLoggedIn: true,
  addresses: [
    {
      id: "addr-1",
      type: "Home",
      tag: "DEFAULT",
      address: "Room 402, Platinum Residency, Mavoor Road, Calicut",
      pincode: "673004",
      landmark: "Near KSRTC Bus Stand"
    },
    {
      id: "addr-2",
      type: "Work",
      tag: "",
      address: "Cyberpark Calicut, 3rd Floor, Nila Building",
      pincode: "673016",
      landmark: "NILA Building Entrance"
    }
  ],
  selectedAddressId: "addr-1"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodly_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [selectedLocation, setSelectedLocation] = useState(() => {
    const savedLoc = localStorage.getItem('foodly_location');
    return savedLoc ? JSON.parse(savedLoc) : { name: "Calicut", area: "Mavoor Road, Kerala" };
  });

  useEffect(() => {
    localStorage.setItem('foodly_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('foodly_location', JSON.stringify(selectedLocation));
  }, [selectedLocation]);

  const login = (mobileOrEmail) => {
    setUser(prev => ({
      ...prev,
      email: mobileOrEmail.includes('@') ? mobileOrEmail : prev.email,
      phone: !mobileOrEmail.includes('@') ? mobileOrEmail : prev.phone,
      isLoggedIn: true
    }));
  };

  const signup = (name, email, phone) => {
    setUser({
      name: name || "Foodly User",
      email: email || "user@foodly.com",
      phone: phone || "+91 98765 43210",
      isLoggedIn: true,
      addresses: [
        {
          id: "addr-1",
          type: "Home",
          tag: "DEFAULT",
          address: "123 Main Street, Calicut",
          pincode: "673001",
          landmark: "City Center"
        }
      ],
      selectedAddressId: "addr-1"
    });
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  const addAddress = (newAddr) => {
    const id = `addr-${Date.now()}`;
    const addressObj = { id, ...newAddr, tag: prev => prev.addresses.length === 0 ? "DEFAULT" : "" };
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, addressObj],
      selectedAddressId: prev.addresses.length === 0 ? id : prev.selectedAddressId
    }));
  };

  const selectAddress = (id) => {
    setUser(prev => ({ ...prev, selectedAddressId: id }));
  };

  const getActiveAddress = () => {
    return user.addresses?.find(a => a.id === user.selectedAddressId) || user.addresses?.[0] || null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      addAddress,
      selectAddress,
      getActiveAddress,
      selectedLocation,
      setSelectedLocation
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
