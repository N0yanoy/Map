import {Map, Marker, Popup} from '@vis.gl/react-maplibre';
import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM } from '../../common/constants';
import { useTasks } from '../../api/hooks/useTasks';
import { useTasksStore } from '../../store/tasksStore';
import { type TaskDTO } from '../../types/tasks';
import 'maplibre-gl/dist/maplibre-gl.css';


export const CustomMap = () => {
  const { data: tasks } = useTasks();
  const { selectedTask, selectTask } = useTasksStore();

  return (
    <Map
      initialViewState={{
        longitude: MAP_LONGITUDE,
        latitude: MAP_LATITUDE,
        zoom: MAP_ZOOM,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    >
      {tasks?.map((task: TaskDTO) => {
        const [lng, lat] = task.location.coordinates;
        return (
          <Marker
            key={task.id}
            longitude={lng}
            latitude={lat}
            color="#354458"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              selectTask(task);
            }}
          />
        );
      })}

      {selectedTask && (
        <Popup
          longitude={selectedTask.location.coordinates[0]}
          latitude={selectedTask.location.coordinates[1]}
          onClose={() => selectTask(null)}
          closeButton={true}
          closeOnClick={false}
          anchor="top"
        >
          <div className="p-2">
            <h2 className="font-bold">{selectedTask.title}</h2>
            <p className="text-sm">{selectedTask.description || "No description"}</p>
            <p className="text-xs text-gray-500">
              {selectedTask.location.coordinates[1].toFixed(4)}° N, {selectedTask.location.coordinates[0].toFixed(4)}° E
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
};