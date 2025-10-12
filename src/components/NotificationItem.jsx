
const NotificationItem = ({ notification }) => {
  return (
    <div className={`p-4 rounded-lg transition-colors ${notification.read ? 'bg-gray-100 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-900 shadow-md'}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${notification.type === 'like' ? 'bg-red-500' : notification.type === 'comment' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>
            {notification.type === 'like' ? '❤' : notification.type === 'comment' ? '💬' : '👤'}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
