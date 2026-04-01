import { useState } from "react";

const ConnectoLogo = () => (
  <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradH" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60b8f5" />
        <stop offset="100%" stopColor="#3a8fd8" />
      </linearGradient>
    </defs>
    <path d="M32 6C17.64 6 6 17.64 6 32c0 4.56 1.22 8.83 3.33 12.5L6 58l13.84-3.26A25.84 25.84 0 0032 58c14.36 0 26-11.64 26-26S46.36 6 32 6z" fill="url(#logoGradH)" />
    <circle cx="22" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="42" cy="32" r="3" fill="white" />
  </svg>
);

const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  trending: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  online: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
    </svg>
  ),
};

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Messages", icon: "chat", badge: 5 },
  { label: "Friends", icon: "users" },
  { label: "Notifications", icon: "bell", badge: 3 },
  { label: "Settings", icon: "settings" },
];

const stats = [
  { label: "Total Messages", value: "2,847", change: "+12%", color: "#3a8fd8", bg: "rgba(58,143,216,0.12)" },
  { label: "Active Friends", value: "142", change: "+5%", color: "#34c98a", bg: "rgba(52,201,138,0.12)" },
  { label: "Groups Joined", value: "18", change: "+2", color: "#f5a623", bg: "rgba(245,166,35,0.12)" },
  { label: "Profile Views", value: "934", change: "+28%", color: "#e05cf5", bg: "rgba(224,92,245,0.12)" },
];

const recentChats = [
  { name: "Sarah Johnson", msg: "Hey! Are you free tonight?", time: "2m ago", unread: 2, avatar: "SJ", color: "#60b8f5" },
  { name: "Dev Team", msg: "New update pushed to main 🚀", time: "15m ago", unread: 5, avatar: "DT", color: "#34c98a" },
  { name: "Mike Chen", msg: "Sounds good, see you then!", time: "1h ago", unread: 0, avatar: "MC", color: "#f5a623" },
  { name: "Priya Sharma", msg: "Did you see the new design?", time: "3h ago", unread: 1, avatar: "PS", color: "#e05cf5" },
];

const onlineFriends = [
  { name: "Alex R.", avatar: "AR", color: "#60b8f5" },
  { name: "Mia K.", avatar: "MK", color: "#34c98a" },
  { name: "Tom B.", avatar: "TB", color: "#f5a623" },
  { name: "Zara L.", avatar: "ZL", color: "#e05cf5" },
  { name: "Sam P.", avatar: "SP", color: "#3a8fd8" },
];

const activities = [
  { text: "Sarah sent you a message", time: "2 min ago", type: "chat" },
  { text: "You joined 'Design Squad' group", time: "1 hr ago", type: "users" },
  { text: "Mike reacted to your post", time: "3 hrs ago", type: "trending" },
  { text: "5 new friend requests", time: "Today", type: "users" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <ConnectoLogo />
          <span style={styles.sidebarLogoText}>CONNECTO</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.label}
              style={{
                ...styles.navItem,
                ...(activeNav === item.label ? styles.navItemActive : {}),
              }}
              onClick={() => setActiveNav(item.label)}
            >
              <span style={{ color: activeNav === item.label ? "#3a8fd8" : "#6b8caa" }}>
                {icons[item.icon]}
              </span>
              <span style={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span style={styles.badge}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div style={styles.sidebarProfile}>
          <div style={{ ...styles.avatar, background: "linear-gradient(135deg,#60b8f5,#3a8fd8)", width: 40, height: 40, fontSize: 15 }}>YO</div>
          <div style={{ flex: 1 }}>
            <div style={styles.profileName}>You</div>
            <div style={styles.profileStatus}>🟢 Online</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Good Morning! 👋</h1>
            <p style={styles.headerSub}>Here's what's happening with your connections today.</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.searchBar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8aabcc" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input placeholder="Search..." style={styles.searchInput} />
            </div>
            <div style={styles.notifBtn}>
              {icons.bell}
              <span style={styles.notifDot} />
            </div>
            <div style={{ ...styles.avatar, background: "linear-gradient(135deg,#60b8f5,#3a8fd8)", width: 40, height: 40, fontSize: 14 }}>YO</div>
          </div>
        </header>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={{ ...styles.statCard, background: s.bg, border: `1.5px solid ${s.color}22` }}>
              <div style={{ ...styles.statIcon, background: s.color + "22", color: s.color }}>
                {icons.trending}
              </div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={{ ...styles.statChange, color: s.color }}>{s.change} this week</div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div style={styles.bottomGrid}>
          {/* Recent Chats */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <span style={styles.panelTitle}>Recent Chats</span>
              <button style={styles.seeAll}>See all</button>
            </div>
            {recentChats.map((chat) => (
              <div key={chat.name} style={styles.chatRow}>
                <div style={{ ...styles.avatar, background: chat.color, width: 44, height: 44, fontSize: 14, flexShrink: 0 }}>
                  {chat.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={styles.chatName}>{chat.name}</div>
                  <div style={styles.chatMsg}>{chat.msg}</div>
                </div>
                <div style={styles.chatMeta}>
                  <span style={styles.chatTime}>{chat.time}</span>
                  {chat.unread > 0 && (
                    <span style={styles.unreadBadge}>{chat.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Online Friends */}
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <span style={styles.panelTitle}>Online Now</span>
                <span style={{ ...styles.seeAll, color: "#34c98a" }}>● {onlineFriends.length} online</span>
              </div>
              <div style={styles.onlineRow}>
                {onlineFriends.map((f) => (
                  <div key={f.name} style={styles.onlineFriend}>
                    <div style={{ position: "relative" }}>
                      <div style={{ ...styles.avatar, background: f.color, width: 46, height: 46, fontSize: 13 }}>{f.avatar}</div>
                      <span style={styles.onlineDot} />
                    </div>
                    <span style={styles.onlineName}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <span style={styles.panelTitle}>Recent Activity</span>
              </div>
              {activities.map((a, i) => (
                <div key={i} style={styles.activityRow}>
                  <div style={styles.activityIcon}>{icons[a.type]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.activityText}>{a.text}</div>
                    <div style={styles.activityTime}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(58,143,216,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #c8e6fa 0%, #dceeff 40%, #f8d8d0 100%)",
    display: "flex",
    fontFamily: "'Nunito', sans-serif",
  },
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(20px)",
    borderRight: "1px solid rgba(255,255,255,0.7)",
    display: "flex",
    flexDirection: "column",
    padding: "28px 16px",
    gap: 8,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingLeft: 8,
    marginBottom: 28,
  },
  sidebarLogoText: {
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: 2,
    color: "#2d7bbf",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 14px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: "#6b8caa",
    transition: "background 0.2s",
    textAlign: "left",
    position: "relative",
  },
  navItemActive: {
    background: "rgba(58,143,216,0.12)",
    color: "#3a8fd8",
  },
  navLabel: {
    flex: 1,
  },
  badge: {
    background: "linear-gradient(90deg,#60b8f5,#3a8fd8)",
    color: "white",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 7px",
  },
  sidebarProfile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 10px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(255,255,255,0.7)",
    marginTop: 10,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a3a5c",
  },
  profileStatus: {
    fontSize: 12,
    color: "#6b8caa",
  },
  avatar: {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 800,
    flexShrink: 0,
  },
  main: {
    flex: 1,
    padding: "28px 32px",
    overflowY: "auto",
    maxHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#1a3a5c",
  },
  headerSub: {
    fontSize: 14,
    color: "#6b8caa",
    marginTop: 2,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.6)",
    border: "1.5px solid rgba(255,255,255,0.7)",
    borderRadius: 12,
    padding: "9px 14px",
    backdropFilter: "blur(10px)",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 14,
    color: "#2d4a6a",
    fontFamily: "'Nunito', sans-serif",
    width: 160,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(255,255,255,0.6)",
    border: "1.5px solid rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6b8caa",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#f5a623",
    border: "2px solid white",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    borderRadius: 18,
    padding: "20px 18px",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 800,
    color: "#1a3a5c",
  },
  statLabel: {
    fontSize: 13,
    color: "#6b8caa",
    fontWeight: 600,
  },
  statChange: {
    fontSize: 12,
    fontWeight: 700,
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  panel: {
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(16px)",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.7)",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(100,160,220,0.1)",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#1a3a5c",
  },
  seeAll: {
    fontSize: 12,
    color: "#3a8fd8",
    fontWeight: 700,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  chatRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(100,160,220,0.1)",
  },
  chatName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a3a5c",
    marginBottom: 2,
  },
  chatMsg: {
    fontSize: 12,
    color: "#6b8caa",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 160,
  },
  chatMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
  },
  chatTime: {
    fontSize: 11,
    color: "#8aabcc",
  },
  unreadBadge: {
    background: "linear-gradient(90deg,#60b8f5,#3a8fd8)",
    color: "white",
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 6px",
  },
  onlineRow: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  onlineFriend: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 11,
    height: 11,
    borderRadius: "50%",
    background: "#34c98a",
    border: "2px solid white",
  },
  onlineName: {
    fontSize: 11,
    color: "#6b8caa",
    fontWeight: 600,
  },
  activityRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(100,160,220,0.1)",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "rgba(58,143,216,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3a8fd8",
    flexShrink: 0,
  },
  activityText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a3a5c",
  },
  activityTime: {
    fontSize: 11,
    color: "#8aabcc",
    marginTop: 2,
  },
};
